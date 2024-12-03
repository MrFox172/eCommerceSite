package com.ecommerce.skater.dto;

import com.ecommerce.skater.data.Category;

public record ProductDto(
        String name,
        String description,
        String price,
        int stockOnHand,
        int categoryId,
        String tags,
        int sellerAccountId,
        String brand
) {
}
