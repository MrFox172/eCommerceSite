package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.ShippingMethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingMethodRepo extends JpaRepository<ShippingMethod, Integer> {
}
