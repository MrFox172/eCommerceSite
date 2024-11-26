package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.SellerAccount;
import com.ecommerce.skater.dto.SellerAccountSignup;
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

    // create a new seller account
    @PostMapping
    public SellerAccount createSellerAccount(@RequestBody SellerAccount sellerAccount) {
        return sellerAccountRepo.save(sellerAccount);
    }

    // get a seller account by id
    @GetMapping("/{id}")
    public SellerAccount getSellerAccountById(@PathVariable Long id) {
        return sellerAccountRepo.findById(id).orElse(null);
    }

    // get all seller accounts
    @GetMapping
    public List<SellerAccount> getAllSellerAccounts() {
        return sellerAccountRepo.findAll();
    }

    // update a seller account
    @PutMapping("/{id}")
    public SellerAccount updateSellerAccount(@PathVariable Long id, @RequestBody SellerAccount sellerAccountDetails) {
        SellerAccount sellerAccount = sellerAccountRepo.findById(id).orElse(null);
        if (sellerAccount != null) {
            sellerAccount.setCompanyName(sellerAccountDetails.getCompanyName());
            return sellerAccountRepo.save(sellerAccount);
        }
        return null;
    }

    // delete a seller account
    @DeleteMapping("/{id}")
    public void deleteSellerAccount(@PathVariable Long id) {
        sellerAccountRepo.deleteById(id);
    }

    // get a seller account by account id
    @GetMapping("/account/{accountId}")
    public SellerAccount getSellerAccountByAccountId(@PathVariable Long accountId) {
        return sellerAccountRepo.findByAccountId(accountId).orElse(null);
    }

    // does seller account by account id
    @GetMapping("/account/{accountId}/exists")
    public Boolean doesSellerAccountByAccountIdExist(@PathVariable Long accountId) {
        return sellerAccountRepo.findByAccountId(accountId).isPresent();
    }

    @PostMapping("/account")
    public SellerAccount createSellerAccount(@RequestBody SellerAccountSignup sellerAccountSignUp) {
        SellerAccount sellerAccount = new SellerAccount();
        sellerAccount.setAccountId(sellerAccountSignUp.accountId());
        sellerAccount.setCompanyName(sellerAccountSignUp.companyName());
        return sellerAccountRepo.save(sellerAccount);
    }
}
