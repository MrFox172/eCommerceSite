package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.SellerAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerAccountRepo extends JpaRepository<SellerAccount, Long> {

    Optional<SellerAccount> findByAccountId(Long accountId);
}
