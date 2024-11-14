package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodRepo extends JpaRepository<PaymentMethod, Long> {
}
