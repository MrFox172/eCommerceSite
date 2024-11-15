package com.ecommerce.skater.controller;

import com.ecommerce.skater.data.Shipment;
import com.ecommerce.skater.repository.ShipmentRepo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentRepo shipmentRepository;

    @GetMapping
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shipment> getShipmentById(@PathVariable Long id) {
        Optional<Shipment> shipment = shipmentRepository.findById(id);
        return shipment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Shipment createShipment(@RequestBody Shipment shipment) {
        return shipmentRepository.save(shipment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shipment> updateShipment(@PathVariable Long id, @RequestBody Shipment shipmentDetails) {
        Optional<Shipment> shipment = shipmentRepository.findById(id);
        if (shipment.isPresent()) {
            Shipment updatedShipment = shipment.get();
            updatedShipment.setAccountOrderId(shipmentDetails.getAccountOrderId());
            updatedShipment.setAddressId(shipmentDetails.getAddressId());
            updatedShipment.setShipmentStatus(shipmentDetails.getShipmentStatus());
            updatedShipment.setShipmentDate(shipmentDetails.getShipmentDate());
            updatedShipment.setTrackingNumber(shipmentDetails.getTrackingNumber());
            updatedShipment.setCreatedate(shipmentDetails.getCreatedate());
            return ResponseEntity.ok(shipmentRepository.save(updatedShipment));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShipment(@PathVariable Long id) {
        Optional<Shipment> shipment = shipmentRepository.findById(id);
        if (shipment.isPresent()) {
            shipmentRepository.delete(shipment.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
