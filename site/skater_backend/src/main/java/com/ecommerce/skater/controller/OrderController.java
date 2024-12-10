package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.*;
import com.ecommerce.skater.dto.CartCheck;
import com.ecommerce.skater.dto.OrderDto;
import com.ecommerce.skater.dto.OrderedProduct;
import com.ecommerce.skater.repository.*;
import com.ecommerce.skater.service.EmailService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.ShippingRate;
import com.stripe.model.checkout.Session;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.ShippingRateCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.*;

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

    @Autowired
    private EmailService emailService;

    @Value("${stripe.secretKey}")
    private String STRIPE_SECRET_KEY;

    @Value("${frontend.url:http://localhost:5173}")
    private String FRONTEND_URL;

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

            var expected = BigDecimal.valueOf(x.expectedPrice()).setScale(2);
            var actual = product.getSalePrice();

            if (!expected.equals(actual)) {
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
    public ResponseEntity createOrder(@RequestBody OrderDto order) throws StripeException {

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

        accountOrder.setOrderNumber("ORD" + "-" + date.toString().replace("-","") + "-" + accountUid.toString().substring(0,7) + account.getId());

        List<Product> products = new ArrayList<>();
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

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

                var expected = BigDecimal.valueOf(x.expectedPrice()).setScale(2);
                var actual = product.getSalePrice();

                if (!expected.equals(actual)) {
                    throw new RuntimeException("Price does not match product price: " + product.getName());
                }

                // create stripe products and prices
                try {

                    Stripe.apiKey = STRIPE_SECRET_KEY;

                    ProductCreateParams productParams =
                            ProductCreateParams.builder()
                                    .setName(product.getName())
                                    .setDescription(product.getDescription())
                                    .build();

                    com.stripe.model.Product stripProduct = com.stripe.model.Product.create(productParams);

                    var salePrice = product.getSalePrice().multiply(new BigDecimal("100"));

                    PriceCreateParams priceparams =
                            PriceCreateParams.builder()
                                    .setProduct(stripProduct.getId())
                                    .setUnitAmount(salePrice.longValue())
                                    .setCurrency("usd")
                                    .build();

                    Price price = Price.create(priceparams);

                    lineItems.add(
                            SessionCreateParams.LineItem.builder()
                            .setQuantity(Long.valueOf(x.expectedQuantity()))
                            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                            .setPrice(price.getId())
                            .build());

                } catch (StripeException e) {
                    throw new RuntimeException(e);
                }

                ProductOrder productOrder = new ProductOrder();
                productOrder.setProduct(product);
                productOrder.setQuantity(x.expectedQuantity());
                productOrder.setLineTotal(product.getPrice().multiply(BigDecimal.valueOf(x.expectedQuantity())));
                accountOrder.addProductOrder(productOrder);
                //product.setStockOnHand(product.getStockOnHand() - x.expectedQuantity());
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

        accountOrder.setOrderTotal(BigDecimal.valueOf(order.expectedOrderTotal()).add(shippingMethod.getPrice()));

        // stripe shipping method object
        // add shipping option to stripe

        ShippingRateCreateParams shippingRateParams =
                ShippingRateCreateParams.builder()
                        .setDisplayName(shippingMethod.getName())
                        .setType(ShippingRateCreateParams.Type.FIXED_AMOUNT)
                        .setFixedAmount(
                                ShippingRateCreateParams.FixedAmount.builder()
                                        .setAmount(shippingMethod.getPrice().multiply(new BigDecimal("100")).longValue())
                                        .setCurrency("usd")
                                        .build()
                        )
                        .build();


        ShippingRate shippingRate = ShippingRate.create(shippingRateParams);

        shipmentRepo.save(shipment);

        var newAccountOrder = accountOrderRepo.save(accountOrder);

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl(FRONTEND_URL + "/cart/success/" + newAccountOrder.getId())
                        .setCancelUrl(FRONTEND_URL + "/cart/cancelled/" + newAccountOrder.getId())
                        .addAllLineItem(lineItems)
                        .addShippingOption(
                                SessionCreateParams.ShippingOption.builder()
                                        .setShippingRate(shippingRate.getId()).build()
                        )
                        .build();

        Session session = Session.create(params);

        return new ResponseEntity(session.getUrl(), HttpStatus.OK);
    }

    @GetMapping("/session/{id}")
    public ResponseEntity<Session> getSession(@PathVariable String id) throws StripeException {
        Stripe.apiKey = STRIPE_SECRET_KEY;
        Session session = Session.retrieve(id);

        return new ResponseEntity<Session>(session, HttpStatus.OK);
    }

    @GetMapping("cancel/{id}")
    public ResponseEntity cancel(@PathVariable int id) {
        AccountOrder accountOrder = accountOrderRepo.findById(id).orElse(null);

        if (accountOrder == null) {
            return new ResponseEntity<String>("Order not found", HttpStatus.BAD_REQUEST);
        }

        accountOrder.setOrderStatus("CANCELLED");

        accountOrderRepo.save(accountOrder);

        return new ResponseEntity(accountOrder, HttpStatus.OK);
    }

    @GetMapping("confirm/{id}")
    public ResponseEntity confirmation(@PathVariable int id) {

            AccountOrder accountOrder = accountOrderRepo.findById(id).orElse(null);

            if (accountOrder == null) {
                return new ResponseEntity<String>("Order not found", HttpStatus.BAD_REQUEST);
            }

            if(!accountOrder.getOrderStatus().equals("COMPLETED")) {

                accountOrder.setOrderStatus("COMPLETED");

                Set<SellerAccount> sellers = new HashSet<>();

                accountOrder.getProductsOrdered().forEach(x -> {
                    Product product = x.getProduct();

                    if(product.getStockOnHand() > 1) {
                        product.setStockOnHand(product.getStockOnHand() - x.getQuantity());
                    }

                    sellers.add(product.getSellerAccount());
                    productRepo.save(product);
                });

                accountOrderRepo.save(accountOrder);

                // send order confirmation email
                emailService.sendOrderConfirmationEmail(accountOrder.getAccount().getEmailaddress(), accountOrder.getOrderNumber(), accountOrder.getCreatedate().toString(), accountOrder.getOrderTotal().toString(), accountOrder.getShipment().getShipmentDate().toString());

                sellers.forEach(
                        x -> emailService.sendSellerOrderNotificationEmail(x.getAccount().getEmailaddress(), accountOrder.getOrderNumber(), accountOrder.getCreatedate().toString(), accountOrder.getOrderTotal().toString(), accountOrder.getShipment().getShipmentDate().toString())
                );
            }
            return new ResponseEntity(accountOrder, HttpStatus.OK);
    }

    @Operation(summary = "Get All Orders", description = "Returns a list of all orders")
    @GetMapping
    public List<AccountOrder> getAllOrders() {
        return accountOrderRepo.findAll();
    }

    // get all completed orders
    @Operation(summary = "Get All Completed Orders", description = "Returns a list of all completed orders")
    @GetMapping("/completed")
    public List<AccountOrder> getCompletedOrders() {
        return accountOrderRepo.findByOrderStatus("COMPLETED");
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
