package com.ecommerce.skater.dto;

import org.springframework.web.multipart.MultipartFile;

public record ProductImageUpload(String productid, MultipartFile file) {
}
