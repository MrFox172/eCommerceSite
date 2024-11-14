package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.PaymentMethod;
import com.ecommerce.skater.repository.PaymentMethodRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment-method")
public class PaymentMethodController {

    @Autowired
    private PaymentMethodRepo paymentMethodRepo;

    // Create a new payment method
    @PostMapping
    public PaymentMethod createPaymentMethod(@RequestBody PaymentMethod paymentMethod) {
        return paymentMethodRepo.save(paymentMethod);
    }

    // Get a payment method by id
    @GetMapping("/{id}")
    public PaymentMethod getPaymentMethodById(@PathVariable Long id) {
        return paymentMethodRepo.findById(id).orElse(null);
    }

    // Get all payment methods
    @GetMapping
    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodRepo.findAll();
    }

    // Update a payment method
    @PutMapping("/{id}")
    public PaymentMethod updatePaymentMethod(@PathVariable Long id, @RequestBody PaymentMethod paymentMethodDetails) {
        PaymentMethod paymentMethod = paymentMethodRepo.findById(id).orElse(null);
        if (paymentMethod != null) {
            paymentMethod.setCardNumber(paymentMethodDetails.getCardNumber());
            paymentMethod.setExpirationDate(paymentMethodDetails.getExpirationDate());
            paymentMethod.setSecurityCode(paymentMethodDetails.getSecurityCode());
            return paymentMethodRepo.save(paymentMethod);
        }
        return null;
    }

    // Delete a payment method
    @DeleteMapping("/{id}")
    public void deletePaymentMethod(@PathVariable Long id) {
        paymentMethodRepo.deleteById(id);
    }
}
