package com.ecommerce.skater.dto;

import java.util.List;

public record Order(
        int accountId,
        int paymentMethodId,
        List<OrderedProduct> orderedProducts,
        double expectedOrderTotal,
        String status
) {
}
