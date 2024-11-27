package com.ecommerce.skater.dto;

import org.springframework.web.multipart.MultipartFile;

public record ProductImageUpload(int productId, MultipartFile file) {
}
