package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Category;
import com.ecommerce.skater.data.Product;
import com.ecommerce.skater.repository.CategoryRepo;
import com.ecommerce.skater.repository.ProductRepo;
import com.ecommerce.skater.repository.SellerAccountRepo;
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
    public Product updateProduct(@PathVariable int id, @RequestBody Product productDetails) {
        Product product = productRepo.findById(id).orElse(null);
        if (product != null) {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setStockOnHand(productDetails.getStockOnHand());
            product.setTags(productDetails.getTags());
            return productRepo.save(product);
        }
        return null;
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
}
