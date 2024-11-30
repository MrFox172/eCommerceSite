package com.ecommerce.skater.dto;

public record ProductDto(
        String name,
        String description,
        String price,
        int stockOnHand,
        int categoryId,
        String tags
) {
}
