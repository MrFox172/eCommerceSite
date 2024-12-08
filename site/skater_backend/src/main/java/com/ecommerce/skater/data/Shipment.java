package com.ecommerce.skater.data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    @JsonManagedReference
    private Address address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_method_id", referencedColumnName = "id")
    @JsonManagedReference
    private ShippingMethod shippingMethod;

    @Column(name = "shipment_status", nullable = false, length = 50)
    private String shipmentStatus;

    @Column(name = "shipment_date", nullable = false)
    private Date shipmentDate;

    @Column(name = "tracking_number", nullable = false, length = 50)
    private String trackingNumber;

    @CreatedDate
    private Timestamp createdate;

    public int getDaysToDeliver() {
        return switch (shippingMethod.getName()) {
            case "Standard: 3-5 Day Shipping" -> 10;
            case "Express: 2 Day Shipping" -> 3;
            case "Next Day Shipping" -> 1;
            default -> 0;
        };
    }

}