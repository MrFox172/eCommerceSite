package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Account;
import com.ecommerce.skater.data.AccountOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountOrderRepo extends JpaRepository<AccountOrder, Integer> {

    List<AccountOrder> findByAccount(Account account);
}