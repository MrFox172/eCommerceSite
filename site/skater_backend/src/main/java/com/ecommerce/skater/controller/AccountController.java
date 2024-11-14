package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Account;
import com.ecommerce.skater.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountRepo accountRepo;

    @GetMapping("{id}")
    public Account getAccountById(@PathVariable Long id) {
        return accountRepo.findById(id).orElse(null);
    }

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountRepo.findAll();
    }

    @GetMapping("/email/{email}")
    public Account getAccountByEmail(@PathVariable String email) {
        return accountRepo.findOneByEmailaddress(email);
    }

    @PostMapping("/login")
    public Account authenticateAccount(@RequestBody Account account) {
        return accountRepo.findOneByEmailaddressAndPassword(account.getEmailaddress(), account.getPassword());
    }

    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountRepo.save(account);
    }

    @GetMapping("/new")
    public Account createAccount(String name) {

        Account account = new Account();
        account.setFirstname("John");
        account.setLastname("Doe");
        account.setEmailaddress("john.doe@gmail.com");
        account.setPassword("password");
        account.setPhonenumber("123-333-4444");
        return accountRepo.save(account);
    }


}
