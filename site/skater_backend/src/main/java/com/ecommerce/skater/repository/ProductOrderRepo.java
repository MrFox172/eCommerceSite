package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductOrderRepo extends JpaRepository<ProductOrder, Integer> {
}
