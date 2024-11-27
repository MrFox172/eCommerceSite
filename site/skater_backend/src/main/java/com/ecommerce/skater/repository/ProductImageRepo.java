package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepo extends JpaRepository<ProductImage, Integer> {

    List<ProductImage> findAllByProductId(int id);
}
