package com.ecommerce.skater.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    // create get method for hello world
    @GetMapping("/")
    public Map<String, String> hello() {

        return Map.of("status", "success");
    }

}
