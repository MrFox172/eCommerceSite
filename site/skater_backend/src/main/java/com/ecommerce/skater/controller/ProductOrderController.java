package com.ecommerce.skater.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecommerce.skater.data.ProductOrder;
import com.ecommerce.skater.repository.ProductOrderRepo;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product-orders")
public class ProductOrderController {

    @Autowired
    private ProductOrderRepo productOrderRepository;

    // create api endpoint for creating a new ProductOrder
    @PostMapping
    public ProductOrder createProductOrder(@RequestBody ProductOrder productOrder) {
        return productOrderRepository.save(productOrder);
    }

    // create api endpoint for reading a ProductOrder
    @GetMapping("/{id}")
    public ResponseEntity<ProductOrder> getProductOrderById(@PathVariable Long id) {
        Optional<ProductOrder> productOrder = productOrderRepository.findById(id);
        return productOrder.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // create api endpoint for reading all ProductOrders
    @GetMapping
    public List<ProductOrder> getAllProductOrders() {
        return productOrderRepository.findAll();
    }

    // create api endpoint for updating a ProductOrder
    @PutMapping("/{id}")
    public ResponseEntity<ProductOrder> updateProductOrder(@PathVariable Long id, @RequestBody ProductOrder productOrderDetails) {
        Optional<ProductOrder> productOrder = productOrderRepository.findById(id);
        if (productOrder.isPresent()) {
            ProductOrder updatedProductOrder = productOrder.get();
            updatedProductOrder.setAccountOrderId(productOrderDetails.getAccountOrderId());
            updatedProductOrder.setProductId(productOrderDetails.getProductId());
            updatedProductOrder.setQuantity(productOrderDetails.getQuantity());
            updatedProductOrder.setLineTotal(productOrderDetails.getLineTotal());
            updatedProductOrder.setCreatedate(productOrderDetails.getCreatedate());
            return ResponseEntity.ok(productOrderRepository.save(updatedProductOrder));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // create api endpoint for deleting a ProductOrder
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductOrder(@PathVariable Long id) {
        Optional<ProductOrder> productOrder = productOrderRepository.findById(id);
        if (productOrder.isPresent()) {
            productOrderRepository.delete(productOrder.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
