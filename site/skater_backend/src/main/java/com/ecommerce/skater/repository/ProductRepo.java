package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Product;
import com.ecommerce.skater.data.SellerAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

    List<Product> findBySellerAccount(SellerAccount sellerAccount);
}
