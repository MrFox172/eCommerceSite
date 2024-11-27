package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
    Optional<Category> findByNameIgnoreCase(String name);
    void deleteById(int id);
    List<Category> findAll();
}
