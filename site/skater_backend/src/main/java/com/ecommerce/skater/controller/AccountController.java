package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Account;
import com.ecommerce.skater.dto.AccountLogin;
import com.ecommerce.skater.dto.AccountSignUp;
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
    public Account authenticateAccount(@RequestBody AccountLogin account) {
        return accountRepo.findOneByEmailaddressAndPassword(account.emailaddress(), account.password());
    }

    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountRepo.save(account);
    }

    @PostMapping("/signup")
    public Account createAccount(@RequestBody AccountSignUp accountSignUp) {
        Account account = new Account();
        account.setFirstname(accountSignUp.firstname());
        account.setLastname(accountSignUp.lastname());
        account.setEmailaddress(accountSignUp.emailaddress());
        account.setPhonenumber(accountSignUp.phonenumber());
        account.setPassword(accountSignUp.password());
        return accountRepo.save(account);
    }

}
