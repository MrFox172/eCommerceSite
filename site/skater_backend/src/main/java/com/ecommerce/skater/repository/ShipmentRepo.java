package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentRepo extends JpaRepository<Shipment, Integer> {
}
