package com.ecommerce.skater.dto;

import java.util.List;

public record CartCheck(List<OrderedProduct> orderedProducts) {
}
