package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Category;
import com.ecommerce.skater.data.Product;
import com.ecommerce.skater.data.SellerAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    List<Product> findBySellerAccount(SellerAccount sellerAccount);

    List<Product> findByCategory(Category category);

    // get all products containing a specific tag
    List<Product> findByTagsContaining(String tag);

    // create a query to search for products by all fields
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%',?1,'%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%',?1,'%')) OR " +
            "LOWER(p.tags) LIKE LOWER(CONCAT('%',?1,'%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%',?1,'%')) OR " +
            "LOWER(p.category.name) LIKE LOWER(CONCAT('%',?1,'%')) OR " +
            "LOWER(p.price) LIKE LOWER(CONCAT('%',?1,'%'))")
    List<Product> findBySearchKeyword(String keyword);

    // get all product brand names
    @Query("SELECT DISTINCT p.brand FROM Product p")
    List<String> findAllBrands();


}
