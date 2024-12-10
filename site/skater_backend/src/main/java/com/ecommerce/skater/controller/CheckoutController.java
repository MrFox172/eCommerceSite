package com.ecommerce.skater.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin
public class CheckoutController {

    //@Value("${STRIPE_SECRET_KEY}")
    //private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = "";
    }

    // Create a new Checkout Session
    @GetMapping("/create-checkout-session")
    public String createCheckoutSession() throws StripeException {
        Stripe.apiKey = "";

        ProductCreateParams productParams =
                ProductCreateParams.builder()
                        .addImage("https://hyyercode-ecommerce-s3.s3.amazonaws.com/1/skate1.jpeg")
                        .setName("Shoe").build();

        Product product = Product.create(productParams);

        ProductCreateParams productParams1 =
                ProductCreateParams.builder()
                        .addImage("https://hyyercode-ecommerce-s3.s3.amazonaws.com/1/skate1.jpeg")
                        .setName("T-shirt").build();

        Product product1 = Product.create(productParams1);

        PriceCreateParams priceparams =
                PriceCreateParams.builder()
                        .setProduct(product.getId())
                        .setUnitAmount(2000L)
                        .setCurrency("usd")
                        .build();
        Price price = Price.create(priceparams);

        PriceCreateParams priceparams1 =
                PriceCreateParams.builder()
                        .setProduct(product.getId())
                        .setUnitAmount(2000L)
                        .setCurrency("usd")
                        .build();
        Price price1 = Price.create(priceparams);

        String YOUR_DOMAIN = "http://localhost:5173";
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl(YOUR_DOMAIN + "?success=true")
                        .setCancelUrl(YOUR_DOMAIN + "?canceled=true")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                                        .setPrice(price1.getId())
                                        .build())
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                                        .setPrice(price.getId())
                                        .build())
                        .build();
        Session session = Session.create(params);
        session.getStatus();
        return session.getUrl();
    }
}
