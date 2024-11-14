package com.ecommerce.skater;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SkaterApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkaterApplication.class, args);
	}

}
