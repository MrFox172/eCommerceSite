package com.ecommerce.skater.service;

import com.ecommerce.skater.data.ProductImage;
import com.ecommerce.skater.dto.ProductImageUpload;
import com.ecommerce.skater.repository.ProductImageRepo;
import com.ecommerce.skater.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import java.io.*;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileUploadService {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    private S3Client s3Client;

    @Autowired
    private ProductImageRepo productImageRepository;
    @Autowired
    private ProductRepo productRepo;

    public ProductImage uploadFile(ProductImageUpload uploadfile) {

        Region region = Region.US_EAST_1;
        s3Client = S3Client.builder()
                .region(region)
                .build();

        byte[] buff;

        MultipartFile multipartFile = uploadfile.file();

        try (InputStream initialStream = multipartFile.getInputStream()) {
            buff = new byte[initialStream.available()];
            initialStream.read(buff);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String keyName = uploadfile.productId() + "/" + multipartFile.getOriginalFilename();
        String filePath = "/tmp/" + keyName;

        // create directory if not exists
        File directory = new File("/tmp/" + uploadfile.productId());
        if (!directory.exists()) {
            directory.mkdirs();
        }

        File targetFile = new File(filePath);

        try (OutputStream outStream = new FileOutputStream(targetFile)) {
            outStream.write(buff);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Initiate a multipart upload
        CreateMultipartUploadRequest createRequest = CreateMultipartUploadRequest.builder()
                .bucket(bucketName)
                .key(keyName)
                .build();

        CreateMultipartUploadResponse createResponse = s3Client.createMultipartUpload(createRequest);

        String uploadId = createResponse.uploadId();

        // Prepare the parts to be uploaded
        List<CompletedPart> completedParts = new ArrayList<>();
        int partNumber = 1;
        ByteBuffer buffer = ByteBuffer.allocate(5 * 1024 * 1024); // Set your preferred part size (5 MB in this example)

        // Read the file and upload each part
        try (RandomAccessFile file = new RandomAccessFile(filePath, "r")) {
            long fileSize = file.length();
            long position = 0;

            while (position < fileSize) {
                file.seek(position);
                int bytesRead = file.getChannel().read(buffer);

                buffer.flip();
                UploadPartRequest uploadPartRequest = UploadPartRequest.builder()
                        .bucket(bucketName)
                        .key(keyName)
                        .uploadId(uploadId)
                        .partNumber(partNumber)
                        .contentLength((long) bytesRead)
                        .build();

                UploadPartResponse response = s3Client.uploadPart(uploadPartRequest, RequestBody.fromByteBuffer(buffer));

                completedParts.add(CompletedPart.builder()
                        .partNumber(partNumber)
                        .eTag(response.eTag())
                        .build());

                buffer.clear();
                position += bytesRead;
                partNumber++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Complete the multipart upload
        CompletedMultipartUpload completedUpload = CompletedMultipartUpload.builder()
                .parts(completedParts)
                .build();

        CompleteMultipartUploadRequest completeRequest = CompleteMultipartUploadRequest.builder()
                .bucket(bucketName)
                .key(keyName)
                .uploadId(uploadId)
                .multipartUpload(completedUpload)
                .build();

        CompleteMultipartUploadResponse completeResponse = s3Client.completeMultipartUpload(completeRequest);

        // Print the object's URL
        String objectUrl = s3Client.utilities().getUrl(GetUrlRequest.builder()
                        .bucket(bucketName)
                        .key(keyName)
                        .build())
                .toExternalForm();

        //System.out.println("Uploaded object URL: " + objectUrl);

        s3Client.close();
        targetFile.delete();
        directory.delete();

        var product = productRepo.findById(uploadfile.productId()).orElse(null);

        ProductImage productImage = new ProductImage();
        productImage.setProduct(product);
        productImage.setName(multipartFile.getOriginalFilename());
        productImage.setImageUrl(objectUrl);
        productImageRepository.save(productImage);

        return productImageRepository.save(productImage);
    }
}
