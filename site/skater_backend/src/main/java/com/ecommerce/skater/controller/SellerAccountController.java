package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Account;
import com.ecommerce.skater.data.SellerAccount;
import com.ecommerce.skater.dto.SellerAccountSignup;
import com.ecommerce.skater.repository.AccountRepo;
import com.ecommerce.skater.repository.SellerAccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin
public class SellerAccountController {

    @Autowired
    private SellerAccountRepo sellerAccountRepo;

    @Autowired
    private AccountRepo accountRepo;

    // create a new seller account
    @PostMapping
    public SellerAccount createSellerAccount(@RequestBody SellerAccount sellerAccount) {
        return sellerAccountRepo.save(sellerAccount);
    }

    // get a seller account by id
    @GetMapping("/{id}")
    public SellerAccount getSellerAccountById(@PathVariable int id) {
        return sellerAccountRepo.findById(id).orElse(null);
    }

    // get all seller accounts
    @GetMapping
    public List<SellerAccount> getAllSellerAccounts() {
        return sellerAccountRepo.findAll();
    }

    // update a seller account
    @PutMapping("/{id}")
    public SellerAccount updateSellerAccount(@PathVariable int id, @RequestBody SellerAccount sellerAccountDetails) {
        SellerAccount sellerAccount = sellerAccountRepo.findById(id).orElse(null);
        if (sellerAccount != null) {
            sellerAccount.setCompanyName(sellerAccountDetails.getCompanyName());
            return sellerAccountRepo.save(sellerAccount);
        }
        return null;
    }

    // delete a seller account
    @DeleteMapping("/{id}")
    public void deleteSellerAccount(@PathVariable int id) {
        sellerAccountRepo.deleteById(id);
    }

    // get a seller account by account id
    @GetMapping("/account/{accountId}")
    public SellerAccount getSellerAccountByAccountId(@PathVariable int accountId) {
        return sellerAccountRepo.findByAccountId(accountId).orElse(null);
    }

    // does seller account by account id
    @GetMapping("/account/{accountId}/exists")
    public Boolean doesSellerAccountByAccountIdExist(@PathVariable int accountId) {
        return sellerAccountRepo.findByAccountId(accountId).isPresent();
    }

    @PostMapping("/account")
    public Account createSellerAccount(@RequestBody SellerAccountSignup sellerAccountSignUp) {

        var account = accountRepo.findById(sellerAccountSignUp.accountId()).orElse(null);
        if (account == null) {
            return null;
        }
        SellerAccount sellerAccount = new SellerAccount();
        sellerAccount.setAccount(account);
        sellerAccount.setCompanyName(sellerAccountSignUp.companyName());

        account.setSellerAccount(sellerAccount);
        return accountRepo.save(account);
    }
}
