package com.ecommerce.skater.dto;

public record AddressDto(
        int accountId,
        String street,
        String city,
        String state,
        String zipCode,
        String recipientName
) {
}
