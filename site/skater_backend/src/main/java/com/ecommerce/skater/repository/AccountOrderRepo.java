package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.AccountOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountOrderRepo extends JpaRepository<AccountOrder, Long> {
}