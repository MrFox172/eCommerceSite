package com.ecommerce.skater.dto;

public record AddressDto(
        int accountId,
        String street,
        String city,
        String state,
        String zip,
        String recipientName
) {
}
