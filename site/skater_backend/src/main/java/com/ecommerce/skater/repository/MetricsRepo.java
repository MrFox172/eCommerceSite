package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Metric;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetricsRepo extends JpaRepository<Metric, Integer> {
}
