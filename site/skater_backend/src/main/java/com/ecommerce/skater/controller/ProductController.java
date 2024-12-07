package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Category;
import com.ecommerce.skater.data.Product;
import com.ecommerce.skater.data.ProductImage;
import com.ecommerce.skater.dto.ProductImageUpload;
import com.ecommerce.skater.repository.CategoryRepo;
import com.ecommerce.skater.repository.ProductImageRepo;
import com.ecommerce.skater.repository.ProductRepo;
import com.ecommerce.skater.repository.SellerAccountRepo;
import com.ecommerce.skater.service.FileUploadService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecommerce.skater.dto.ProductDto;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private SellerAccountRepo sellerAccountRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private FileUploadService fileService;

    @Autowired
    private ProductImageRepo productImageRepo;

    // create a new product
    @Operation(summary = "Create a new Product", description = "Creates a new product")
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto product) {
        Product newProduct = new Product();
        newProduct.setName(product.name());
        newProduct.setDescription(product.description());
        newProduct.setPrice(product.price());
        newProduct.setStockOnHand(product.stockOnHand());
        newProduct.setTags(product.tags());
        newProduct.setBrand(product.brand());
        newProduct.setSalePrice(product.salePrice());

        var category = categoryRepo.findById(product.categoryId()).orElse(null);
        newProduct.setCategory(category);

        var seller = sellerAccountRepo.findById(product.sellerAccountId()).orElse(null);
        newProduct.setSellerAccount(seller);
        try {
            return new ResponseEntity<Product>(productRepo.save(newProduct), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);
        }
    }

    // get a product by id
    @Operation(summary = "Get Product by ID", description = "Returns a product by ID")
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id) {
        return productRepo.findById(id).orElse(null);
    }

    // get all products
    @Operation(summary = "Get All Products", description = "Returns a list of all products")
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    // update a product
    @PutMapping("/{id}")
    public ResponseEntity<Product>  updateProduct(@PathVariable int id, @RequestBody ProductDto productDetails) {

        try {
            Product product = productRepo.findById(id).orElse(null);
            if (product == null) {
                return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
            }

            product.setName(productDetails.name());
            product.setDescription(productDetails.description());
            product.setPrice(productDetails.price());
            product.setStockOnHand(productDetails.stockOnHand());
            product.setTags(productDetails.tags());
            product.setBrand(productDetails.brand());
            product.setSalePrice(productDetails.salePrice());

            var category = categoryRepo.findById(productDetails.categoryId()).orElse(null);
            product.setCategory(category);

            var updatedProduct = productRepo.save(product);
            return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);
        }
    }

    // delete a product
    @Operation(summary = "Delete Product", description = "Deletes a product by ID")
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        productRepo.deleteById(id);
    }

    // get all products by seller id
    @Operation(summary = "Get Products by Seller ID", description = "Returns a list of products by seller ID")
    @GetMapping("/seller/{sellerId}")
    public List<Product> getProductsBySellerId(@PathVariable int sellerId) {
        var seller = sellerAccountRepo.findById(sellerId).orElse(null);
        return productRepo.findBySellerAccount(seller);
    }

    // get all products by category id
    @Operation(summary = "Get Products by Category ID", description = "Returns a list of products by category ID")
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategoryId(@PathVariable int categoryId) {
        var category = categoryRepo.findById(categoryId).orElse(null);

        return productRepo.findByCategory(category);
    }

    // get all products by category name
    @Operation(summary = "Get Products by Category Name", description = "Returns a list of products by category name")
    @GetMapping("/category/name/{categoryName}")
    public List<Product> getProductsByCategoryName(@PathVariable String categoryName) {
        var category = categoryRepo.findByNameIgnoreCase(categoryName).orElse(null);

        return productRepo.findByCategory(category);
    }

    // get all products by tag
    @Operation(summary = "Get Products by Tag", description = "Returns a list of products by tag")
    @GetMapping("/tag/{tag}")
    public List<Product> getProductsByTag(@PathVariable String tag) {
        return productRepo.findByTagsContaining(tag);
    }

    // get all product categories
    @Operation(summary = "Get All Product Categories", description = "Returns a list of all product categories")
    @GetMapping("/categories")
    public List<Category> getAllProductCategories() {
        return categoryRepo.findAll();
    }

    @Operation(summary = "Get Products by Tag that are on sale", description = "Returns a list of products by tag")
    @GetMapping("/tag/{tag}/sale")
    public List<Product> getProductsOnSaleByTag(@PathVariable String tag) {
        return productRepo.findByTagsContaining(tag).stream().filter(Product::isOnSale).toList();
    }

    // get all products by category name
    @Operation(summary = "Get Products by Category Name that are on sale", description = "Returns a list of products by category name")
    @GetMapping("/category/name/{categoryName}/sale")
    public List<Product> getProductsOnSaleByCategoryName(@PathVariable String categoryName) {
        var category = categoryRepo.findByNameIgnoreCase(categoryName).orElse(null);

        return productRepo.findByCategory(category).stream().filter(Product::isOnSale).toList();
    }

    @PostMapping(value="/images", consumes = "multipart/form-data")
    public ResponseEntity<Product> uploadFile(@ModelAttribute ProductImageUpload upload) {

        try {
            fileService.uploadFile(upload);
            var product = productRepo.findById(upload.productId()).orElse(null);
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/images/{imageid}")
    public ResponseEntity<Product> deleteImage(@PathVariable int imageid) {
        try {
            var image = productImageRepo.findById(imageid).orElse(null);
            if (image == null) {
                return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);
            }
            var product = image.getProduct();
            image.setProduct(null);
            productImageRepo.delete(image);
            return new ResponseEntity<Product>(productRepo.findById(product.getId()).orElse(null),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Product>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productRepo.findBySearchKeyword(keyword);
    }

    @GetMapping("/brands")
    public List<String> getAllBrands() {
        return productRepo.findAllBrands();
    }



}
