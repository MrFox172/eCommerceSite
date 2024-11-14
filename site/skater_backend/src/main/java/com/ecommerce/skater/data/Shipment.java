package com.ecommerce.skater.data;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "shipment")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@EntityListeners(AuditingEntityListener.class)
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "account_order_id", nullable = false)
    private Integer accountOrderId;

    @Column(name = "address_id", nullable = false)
    private Integer addressId;

    @Column(name = "shipment_status", nullable = false, length = 50)
    private String shipmentStatus;

    @Column(name = "shipment_date", nullable = false)
    private Timestamp shipmentDate;

    @Column(name = "tracking_number", nullable = false, length = 50)
    private String trackingNumber;

    @CreatedDate
    private Timestamp createdate;

}