package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Metric;
import com.ecommerce.skater.data.Revenue;
import com.ecommerce.skater.repository.MetricsRepo;
import com.ecommerce.skater.repository.RevenueRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private MetricsRepo metricsRepo;

    @Autowired
    private RevenueRepo revenueRepo;

    // find all metrics and return them
    @GetMapping("/metrics")
    public Metric getMetrics() {
        return metricsRepo.findAll().getFirst();
    }

    // find all revenue and return them
    @GetMapping("/revenue")
    public Revenue getRevenue() {
        return revenueRepo.findAll().getFirst();
    }
}
