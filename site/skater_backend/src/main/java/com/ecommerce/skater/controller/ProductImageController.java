package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.ProductImage;
import com.ecommerce.skater.dto.ProductImageUpload;
import com.ecommerce.skater.repository.ProductImageRepo;
import com.ecommerce.skater.service.FileUploadService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product-images")
@CrossOrigin
public class ProductImageController {

    @Autowired
    private ProductImageRepo productImageRepository;

    @Autowired
    private FileUploadService fileService;

    @GetMapping
    public List<ProductImage> getAllProductImages() {
        return productImageRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductImage> getProductImageById(@PathVariable Long id) {
        Optional<ProductImage> productImage = productImageRepository.findById(id);
        return productImage.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/product/{id}")
    public List<ProductImage> getProductImagesByProductId(@PathVariable Long id) {
        return productImageRepository.findAllByProductId(id);
    }

    @PostMapping(value="", consumes = "multipart/form-data")
    public ResponseEntity<ProductImage> uploadFile(@ModelAttribute ProductImageUpload upload) {
        return new ResponseEntity<ProductImage>(fileService.uploadFile(upload), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductImage> updateProductImage(@PathVariable Long id, @RequestBody ProductImage productImageDetails) {
        Optional<ProductImage> productImage = productImageRepository.findById(id);
        if (productImage.isPresent()) {
            ProductImage updatedProductImage = productImage.get();
            updatedProductImage.setProductId(productImageDetails.getProductId());
            updatedProductImage.setName(productImageDetails.getName());
            updatedProductImage.setImageUrl(productImageDetails.getImageUrl());
            updatedProductImage.setCreatedate(productImageDetails.getCreatedate());
            return ResponseEntity.ok(productImageRepository.save(updatedProductImage));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductImage(@PathVariable Long id) {
        Optional<ProductImage> productImage = productImageRepository.findById(id);
        if (productImage.isPresent()) {
            productImageRepository.delete(productImage.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}