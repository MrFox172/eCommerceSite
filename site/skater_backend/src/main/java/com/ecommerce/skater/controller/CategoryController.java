package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Category;
import com.ecommerce.skater.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryRepo categoryRepo;

    // create a new category
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryRepo.save(category);
    }

    // get a category by id
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryRepo.findById(id).orElse(null);
    }

    // get all categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // update a category
    @PutMapping("{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        Category category = categoryRepo.findById(id).orElse(null);
        if (category != null) {
            category.setName(categoryDetails.getName());
            return categoryRepo.save(category);
        }
        return null;
    }

    // delete a category
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryRepo.deleteById(id);
    }
}
