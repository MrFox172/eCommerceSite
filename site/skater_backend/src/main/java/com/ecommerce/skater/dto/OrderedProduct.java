package com.ecommerce.skater.dto;

public record OrderedProduct(
        int productId,
        int expectedQuantity,
        double expectedPrice
) {
}
