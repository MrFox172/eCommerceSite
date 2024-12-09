package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.*;
import com.ecommerce.skater.dto.CartCheck;
import com.ecommerce.skater.dto.OrderDto;
import com.ecommerce.skater.dto.OrderedProduct;
import com.ecommerce.skater.repository.*;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    @Autowired
    private ShippingMethodRepo shippingMethodRepo;

    @Autowired
    private PaymentMethodRepo paymentMethodRepo;

    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private ShipmentRepo shipmentRepo;

    @Operation(summary = "Check Cart", description = "Checks if the products in the cart are valid")
    @PostMapping("/cart/check")
    public ResponseEntity cartCheck(@RequestBody CartCheck cartCheck) {

        if (cartCheck.orderedProducts().isEmpty()) {
            return new ResponseEntity("No products in order", HttpStatus.BAD_REQUEST);
        }

        try {

            cartCheck.orderedProducts().forEach(x -> {
            var product = productRepo.findById(x.productId()).orElse(null);

            if (product == null) {
                throw new RuntimeException("Product not found");
            }

            if (x.expectedQuantity() <= 0) {
                throw new RuntimeException("Quantity must be greater than 0");
            }

            if (x.expectedQuantity() > product.getStockOnHand()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            var expected = BigDecimal.valueOf(x.expectedPrice());
            var actual = product.getSalePrice().multiply(BigDecimal.valueOf(x.expectedQuantity()));

            if (!BigDecimal.valueOf(x.expectedPrice()).equals(product.getSalePrice().multiply(BigDecimal.valueOf(x.expectedQuantity())))) {
                throw new RuntimeException("Price does not match product price (expected:"+ expected.toString() +") (actual:"+actual.toString()+"): " + product.getName());
            }
            });

        } catch (RuntimeException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity("Ordered Items Valid!!", HttpStatus.OK);
    }

    @Operation(summary = "Create Order", description = "Creates a new order")
    @PostMapping
    public ResponseEntity createOrder(@RequestBody OrderDto order) {

        var account = accountRepo.findById(order.accountId()).orElse(null);

        if (account == null) {
            new ResponseEntity("Account not found", HttpStatus.BAD_REQUEST);
        }

        if (order.orderedProducts().isEmpty()) {
            new ResponseEntity("No products in order", HttpStatus.BAD_REQUEST);
        }

        LocalDate date = LocalDate.now();
        UUID uuid = UUID.randomUUID();
        UUID accountUid = UUID.randomUUID();

        AccountOrder accountOrder = new AccountOrder();
        accountOrder.setAccount(account);
        accountOrder.setOrderStatus("PENDING");
        accountOrder.setOrderTotal(BigDecimal.valueOf(order.expectedOrderTotal()));
        accountOrder.setOrderNumber("ORD" + "-" + date.toString().replace("-","") + "-" + accountUid.toString().substring(0,7) + account.getId());

        List<Product> products = new ArrayList<>();

        try {
            // Checking if the products in the order are valid
            order.orderedProducts().forEach(x -> {
                var product = productRepo.findById(x.productId()).orElse(null);

                if (product == null) {
                    throw new RuntimeException("Product not found");
                }

                if (x.expectedQuantity() <= 0) {
                    throw new RuntimeException("Quantity must be greater than 0");
                }

                if (x.expectedQuantity() > product.getStockOnHand()) {
                    throw new RuntimeException("Not enough stock for product: " + product.getName());
                }


                if (!BigDecimal.valueOf(x.expectedPrice()).equals(product.getSalePrice().multiply(BigDecimal.valueOf(x.expectedQuantity())))) {
                    throw new RuntimeException("Price does not match product price: " + product.getName());
                }

                ProductOrder productOrder = new ProductOrder();
                productOrder.setProduct(product);
                productOrder.setQuantity(x.expectedQuantity());
                productOrder.setLineTotal(product.getPrice().multiply(BigDecimal.valueOf(x.expectedQuantity())));
                accountOrder.addProductOrder(productOrder);
                product.setStockOnHand(product.getStockOnHand() - x.expectedQuantity());
                products.add(product);
            });
        } catch (RuntimeException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        var shippingMethod = shippingMethodRepo.findById(order.shippingMethodId()).orElse(null);
        if (shippingMethod == null) {
            return new ResponseEntity("Shipping Method not found", HttpStatus.BAD_REQUEST);
        }

        var address = addressRepo.findById(order.addressId()).orElse(null);
        if (address == null) {
            return new ResponseEntity("Buyer Address not found", HttpStatus.BAD_REQUEST);
        }

        var paymentMethod = paymentMethodRepo.findById(order.paymentMethodId()).orElse(null);
        if (paymentMethod == null) {
            //return new ResponseEntity("Payment Method not found", HttpStatus.BAD_REQUEST);
        }

        Shipment shipment = new Shipment();
        shipment.setAddress(address);
        shipment.setShippingMethod(shippingMethod);
        shipment.setShipmentStatus("Processing...");
        shipment.setShipmentDate(Date.valueOf(date.plusDays(shipment.getDaysToDeliver())));
        shipment.setTrackingNumber(uuid.toString().replace("-", ""));
        accountOrder.setShipment(shipment);
        shipmentRepo.save(shipment);

        var completeOrder = accountOrderRepo.save(accountOrder);

        productRepo.saveAll(products);

        return new ResponseEntity(completeOrder, HttpStatus.OK);
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

    @GetMapping("/shipping/options")
    public ResponseEntity<List<ShippingMethod>> getShippingOptions() {
        return new ResponseEntity<List<ShippingMethod>>(shippingMethodRepo.findAll(), HttpStatus.OK);
    }

}
