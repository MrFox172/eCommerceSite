package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {
    List<Address> findByAccountId(Long accountId);
    List<Address> findByCity(String city);
    List<Address> findByState(String state);
    List<Address> findByZip(String zip);
}
