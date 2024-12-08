package com.ecommerce.skater.dto;

import java.util.List;

public record OrderDto(
        int accountId,
        int paymentMethodId,
        int shippingMethodId,
        int addressId,
        List<OrderedProduct> orderedProducts,
        double expectedOrderTotal,
        String status
) {
}
