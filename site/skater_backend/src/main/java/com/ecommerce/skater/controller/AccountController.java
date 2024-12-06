package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Account;
import com.ecommerce.skater.data.AccountOrder;
import com.ecommerce.skater.data.Address;
import com.ecommerce.skater.dto.AccountLogin;
import com.ecommerce.skater.dto.AccountSignUp;
import com.ecommerce.skater.dto.AddressDto;
import com.ecommerce.skater.dto.PasswordDto;
import com.ecommerce.skater.repository.AccountOrderRepo;
import com.ecommerce.skater.repository.AccountRepo;
import com.ecommerce.skater.repository.AddressRepo;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/account")
@CrossOrigin
public class AccountController {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private AccountOrderRepo accountOrderRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Operation(summary = "Get Account by ID", description = "Returns an account by ID")
    @GetMapping("{id}")
    public Account getAccountById(@PathVariable int id) {
        return accountRepo.findById(id).orElse(null);
    }

    @Operation(summary = "Get All Accounts", description = "Returns a list of all accounts")
    @GetMapping
    public List<Account> getAllAccounts() {
        return accountRepo.findAll();
    }

    @Operation(summary = "Get Account by Email", description = "Returns an account by email")
    @GetMapping("/email/{email}")
    public Account getAccountByEmail(@PathVariable String email) {
        return accountRepo.findOneByEmailaddress(email);
    }

    @Operation(summary = "Looks up account by Email and Password", description = "Returns an account by email and password")
    @PostMapping("/login")
    public Account authenticateAccount(@RequestBody AccountLogin account) {
        System.out.println(account.emailaddress());
        System.out.println(account.password());

        return accountRepo.findOneByEmailaddressAndPassword(account.emailaddress(), account.password());
    }

    @Operation(summary = "Create Account", description = "Creates a new account")
    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountRepo.save(account);
    }

    @Operation(summary = "Register/Signup New Account", description = "Creates a new account")
    @PostMapping("/register")
    public Account createAccount(@RequestBody AccountSignUp accountSignUp) {
        Account account = new Account();
        account.setFirstname(accountSignUp.firstname());
        account.setLastname(accountSignUp.lastname());
        account.setEmailaddress(accountSignUp.emailaddress());
        account.setPhonenumber(accountSignUp.phonenumber());
        account.setPassword(accountSignUp.password());
        return accountRepo.save(account);
    }

    // get orders by account id
    @Operation(summary = "Get Orders by Account ID", description = "Returns a list of orders by account ID")
    @GetMapping("/{accountId}/orders")
    public List<AccountOrder> getOrdersByAccountId(@PathVariable int accountId) {

        Account account = accountRepo.findById(accountId).orElse(null);
        if(account == null) {
            return null;
        }
        return accountOrderRepo.findByAccount(account);
    }

    // get addresses by account
    @Operation(summary = "Get Addresses by Account ID", description = "Returns a list of addresses by account ID")
    @GetMapping("/{accountId}/addresses")
    public List<Address> getAddressesByAccountId(@PathVariable int accountId) {

        Account account = accountRepo.findById(accountId).orElse(null);
        if(account == null) {
            return null;
        }
        return account.getAddresses();
    }

    // add address to account
    @Operation(summary = "Add Address to Account", description = "Adds an address to an account")
    @PostMapping("/address")
    public Account addAddressToAccount(@RequestBody AddressDto address) {

        Account account = accountRepo.findById(address.accountId()).orElse(null);
        if(account == null) {
            return null;
        }
        Address newAddress = new Address();
        newAddress.setStreet(address.street());
        newAddress.setCity(address.city());
        newAddress.setState(address.state());
        //newAddress.setCountry(address.country());
        newAddress.setZip(address.zipCode());
        account.addAddress(newAddress);
        return accountRepo.save(account);
    }

    // remove address from account
    @Operation(summary = "Remove Address from Account", description = "Removes an address from an account")
    @DeleteMapping("/{accountId}/address/{addressId}")
    public Account removeAddressFromAccount(@PathVariable int accountId, @PathVariable int addressId) {

        var account = accountRepo.findById(accountId).orElse(null);
        if(account == null) {
            return null;
        }
        var address = addressRepo.findById(addressId).orElse(null);
        if(address == null) {
            return null;
        }
        account.removeAddress(address);
        return accountRepo.save(account);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable int id, @RequestBody Account accountDetails) {
        Account account = accountRepo.findById(id).orElse(null);
        if (account == null) {
            return new ResponseEntity<Account>(HttpStatus.BAD_REQUEST);
        }
        account.setFirstname(accountDetails.getFirstname());
        account.setLastname(accountDetails.getLastname());
        account.setEmailaddress(accountDetails.getEmailaddress());
        account.setPhonenumber(accountDetails.getPhonenumber());
        return new ResponseEntity<Account>(accountRepo.save(account), HttpStatus.OK);
    }

    @PutMapping("/{id}/password")
    public ResponseEntity updateAccountPassword(@PathVariable int id, @RequestBody PasswordDto password) {
        Account account = accountRepo.findById(id).orElse(null);
        if (account == null) {
            return new ResponseEntity("Account not found",HttpStatus.BAD_REQUEST);
        }
        if (!account.getPassword().equals(password.oldPassword())) {
            return new ResponseEntity("Old password does not match!!",HttpStatus.BAD_REQUEST);
        }
        account.setPassword(password.newPassword());
        return new ResponseEntity(accountRepo.save(account),HttpStatus.OK);
    }

}
