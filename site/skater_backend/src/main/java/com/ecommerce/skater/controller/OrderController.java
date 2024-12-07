package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.AccountOrder;
import com.ecommerce.skater.data.Product;
import com.ecommerce.skater.data.ProductOrder;
import com.ecommerce.skater.dto.CartCheck;
import com.ecommerce.skater.dto.Order;
import com.ecommerce.skater.dto.OrderedProduct;
import com.ecommerce.skater.repository.AccountOrderRepo;
import com.ecommerce.skater.repository.AccountRepo;
import com.ecommerce.skater.repository.ProductOrderRepo;
import com.ecommerce.skater.repository.ProductRepo;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
public class OrderController {

    @Autowired
    private AccountOrderRepo accountOrderRepo;

    @Autowired
    private ProductOrderRepo productOrderRepo;

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private ProductRepo productRepo;

    @Operation(summary = "Check Cart", description = "Checks if the products in the cart are valid")
    @PostMapping("/cart/check")
    public ResponseEntity cartCheck(@RequestBody CartCheck cartCheck) {

        if (cartCheck.orderedProducts().isEmpty()) {
            return new ResponseEntity("No products in order", HttpStatus.BAD_REQUEST);
        }

        cartCheck.orderedProducts().forEach(x -> {
            var product = productRepo.findById(x.productId()).orElse(null);

            if (product == null) {
                new ResponseEntity("Product not found", HttpStatus.BAD_REQUEST);
            }

            if (x.expectedQuantity() <= 0) {
                new ResponseEntity("Quantity must be greater than 0", HttpStatus.BAD_REQUEST);
            }

            if (x.expectedQuantity() > product.getStockOnHand()) {
                new ResponseEntity("Not enough stock for product: " + product.getName(), HttpStatus.BAD_REQUEST);
            }

            if (x.expectedPrice() != product.getPrice()) {
                new ResponseEntity("Price does not match product price: " + product.getName(), HttpStatus.BAD_REQUEST);
            }
        });

        return new ResponseEntity("Ordered Items Valid!!", HttpStatus.OK);
    }

    @Operation(summary = "Create Order", description = "Creates a new order")
    @PostMapping
    public ResponseEntity createOrder(@RequestBody Order order) {

        var account = accountRepo.findById(order.accountId()).orElse(null);

        if (account == null) {
            new ResponseEntity("Account not found", HttpStatus.BAD_REQUEST);
        }

        if (order.orderedProducts().isEmpty()) {
            new ResponseEntity("No products in order", HttpStatus.BAD_REQUEST);
        }

        AccountOrder accountOrder = new AccountOrder();
        accountOrder.setAccount(account);
        accountOrder.setOrderStatus("PENDING");
        accountOrder.setOrderTotal(order.expectedOrderTotal());

        // Checking if the products in the order are valid
        order.orderedProducts().forEach(x -> {
            var product = productRepo.findById(x.productId()).orElse(null);

            if (product == null) {
                new ResponseEntity("Product not found", HttpStatus.BAD_REQUEST);
            }

            if (x.expectedQuantity() <= 0) {
                new ResponseEntity("Quantity must be greater than 0", HttpStatus.BAD_REQUEST);
            }

            if (x.expectedQuantity() > product.getStockOnHand()) {
                new ResponseEntity("Not enough stock for product: " + product.getName(), HttpStatus.BAD_REQUEST);
            }

            if (x.expectedPrice() != product.getPrice()) {
                new ResponseEntity("Price does not match product price: " + product.getName(), HttpStatus.BAD_REQUEST);
            }

            ProductOrder productOrder = new ProductOrder();
            productOrder.setProduct(product);
            productOrder.setQuantity(x.expectedQuantity());
            accountOrder.addProductOrder(productOrder);
        });

        return new ResponseEntity(accountOrderRepo.save(accountOrder), HttpStatus.OK);
    }

    @Operation(summary = "Get All Orders", description = "Returns a list of all orders")
    @GetMapping
    public List<AccountOrder> getAllOrders() {
        return accountOrderRepo.findAll();
    }

    @Operation(summary = "Get Order by ID", description = "Returns the order with the specified ID")
    @GetMapping("/{id}")
    public AccountOrder getOrderById(@PathVariable int id) {
        return accountOrderRepo.findById(id).orElse(null);
    }

    @Operation(summary = "Update Order Status", description = "Returns the updated order")
    @PutMapping("/{id}/status")
    public AccountOrder updateOrderStatus(@PathVariable int id, @RequestBody String orderStatus) {
        AccountOrder accountOrder = accountOrderRepo.findById(id).orElse(null);
        if (accountOrder != null) {
            accountOrder.setOrderStatus(orderStatus);
            return accountOrderRepo.save(accountOrder);
        }
        return null;
    }

    @Operation(summary = "Get Order Status", description = "Returns the status of the order")
    @GetMapping("/{id}/status")
    public String getOrderStatus(@PathVariable int id) {
        AccountOrder accountOrder = accountOrderRepo.findById(id).orElse(null);
        if (accountOrder != null) {
            return accountOrder.getOrderStatus();
        }
        return null;
    }

    // add product to order
    @Operation(summary = "Add Product to Order", description = "Returns the updated order")
    @PostMapping("/{id}/product")
    public AccountOrder addProductToOrder(@PathVariable int id, @RequestBody OrderedProduct product) {
        AccountOrder accountOrder = accountOrderRepo.findById(id).orElse(null);
        if (accountOrder != null) {

            Product productdata = productRepo.findById(product.productId()).orElse(null);
            if (productdata == null) {
                throw new RuntimeException("Product not found");
            }
            ProductOrder productOrder = new ProductOrder();
            productOrder.setProduct(productdata);
            productOrder.setQuantity(product.expectedQuantity());

            accountOrder.addProductOrder(productOrder);
            return accountOrderRepo.save(accountOrder);
        }
        return null;
    }

    // remove product from order
    @Operation(summary = "Remove Product from Order", description = "Returns the updated order")
    @DeleteMapping("/{id}/product/{productId}")
    public AccountOrder removeProductFromOrder(@PathVariable int id, @PathVariable int productId) {
        AccountOrder accountOrder = accountOrderRepo.findById(id).orElse(null);
        if (accountOrder != null) {
            productOrderRepo.deleteById(productId);
            return accountOrderRepo.findById(id).orElse(null);
        }
        return null;
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<AccountOrder>> getOrdersByAccount(@PathVariable int accountId) {
        var account = accountRepo.findById(accountId).orElse(null);
        if (account == null) {
            return new ResponseEntity<List<AccountOrder>>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<List<AccountOrder>>(accountOrderRepo.findByAccount(account), HttpStatus.OK);
    }

}
