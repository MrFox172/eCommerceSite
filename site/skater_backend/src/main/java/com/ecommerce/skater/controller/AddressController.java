package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Address;
import com.ecommerce.skater.repository.AddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressRepo addressRepo;

    // create a new address
    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        return addressRepo.save(address);
    }

    // get an address by id
    @GetMapping("/{id}")
    public Address getAddressById(@PathVariable Long id) {
        return addressRepo.findById(id).orElse(null);
    }

    // get all addresses
    @GetMapping
    public List<Address> getAllAddresses() {
        return addressRepo.findAll();
    }

    // update an address
    @PutMapping("/{id}")
    public Address updateAddress(@PathVariable Long id, @RequestBody Address addressDetails) {
        Address address = addressRepo.findById(id).orElse(null);
        if (address != null) {
            address.setStreet(addressDetails.getStreet());
            address.setCity(addressDetails.getCity());
            address.setState(addressDetails.getState());
            address.setZip(addressDetails.getZip());
            return addressRepo.save(address);
        }
        return null;
    }

    // delete an address
    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Long id) {
        addressRepo.deleteById(id);
    }

    // get all addresses by account id
    @GetMapping("/account/{accountId}")
    public List<Address> getAddressesByAccountId(@PathVariable Long accountId) {
        return addressRepo.findByAccountId(accountId);
    }

    // get all addresses by city
    @GetMapping("/city/{city}")
    public List<Address> getAddressesByCity(@PathVariable String city) {
        return addressRepo.findByCity(city);
    }

    // get all addresses by state
    @GetMapping("/state/{state}")
    public List<Address> getAddressesByState(@PathVariable String state) {
        return addressRepo.findByState(state);
    }

    // get all addresses by zip code
    @GetMapping("/zipcode/{zipCode}")
    public List<Address> getAddressesByZipCode(@PathVariable String zipCode) {
        return addressRepo.findByZip(zipCode);
    }
}
