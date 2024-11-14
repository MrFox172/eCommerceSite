package com.ecommerce.skater.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    // create get method for hello world
    @GetMapping("/")
    public String hello() {
        return "{\"status\": \"Up\"}";
    }

}
