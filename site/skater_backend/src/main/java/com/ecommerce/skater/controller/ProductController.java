package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Product;
import com.ecommerce.skater.repository.ProductRepo;
import com.ecommerce.skater.repository.SellerAccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private SellerAccountRepo sellerAccountRepo;

    // create a new product
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepo.save(product);
    }

    // get a product by id
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepo.findById(id).orElse(null);
    }

    // get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    // update a product
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepo.findById(id).orElse(null);
        if (product != null) {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setMaxQuantity(productDetails.getMaxQuantity());
            product.setTags(productDetails.getTags());
            return productRepo.save(product);
        }
        return null;
    }

    // delete a product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepo.deleteById(id);
    }

    // get all products by seller id
    @GetMapping("/seller/{sellerId}")
    public List<Product> getProductsBySellerId(@PathVariable Long sellerId) {
        var seller = sellerAccountRepo.findById(sellerId).orElse(null);
        return productRepo.findBySellerAccount(seller);
    }
}
