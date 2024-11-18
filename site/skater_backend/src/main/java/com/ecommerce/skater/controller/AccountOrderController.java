package com.ecommerce.skater.controller;

import org.springframework.web.bind.annotation.RestController;
import com.ecommerce.skater.data.AccountOrder;
import com.ecommerce.skater.repository.AccountOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/account-orders")
@CrossOrigin
public class AccountOrderController {

    @Autowired
    private AccountOrderRepo accountOrderRepository;

    @GetMapping
    public List<AccountOrder> getAllAccountOrders() {
        return accountOrderRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountOrder> getAccountOrderById(@PathVariable Long id) {
        Optional<AccountOrder> accountOrder = accountOrderRepository.findById(id);
        return accountOrder.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public AccountOrder createAccountOrder(@RequestBody AccountOrder accountOrder) {
        return accountOrderRepository.save(accountOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountOrder> updateAccountOrder(@PathVariable Long id, @RequestBody AccountOrder accountOrderDetails) {
        Optional<AccountOrder> accountOrder = accountOrderRepository.findById(id);
        if (accountOrder.isPresent()) {
            AccountOrder updatedAccountOrder = accountOrder.get();
            updatedAccountOrder.setAccountId(accountOrderDetails.getAccountId());
            updatedAccountOrder.setOrderStatus(accountOrderDetails.getOrderStatus());
            updatedAccountOrder.setOrderTotal(accountOrderDetails.getOrderTotal());
            updatedAccountOrder.setCreatedate(accountOrderDetails.getCreatedate());
            return ResponseEntity.ok(accountOrderRepository.save(updatedAccountOrder));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccountOrder(@PathVariable Long id) {
        Optional<AccountOrder> accountOrder = accountOrderRepository.findById(id);
        if (accountOrder.isPresent()) {
            accountOrderRepository.delete(accountOrder.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
