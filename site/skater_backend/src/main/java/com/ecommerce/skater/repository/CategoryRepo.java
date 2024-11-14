package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    Category findByName(String name);
    Category findById(long id);
    void deleteById(long id);
    List<Category> findAll();
}
