package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Product;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface SearchRepo extends PagingAndSortingRepository<Product,Integer> {

}
