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

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "account_order")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@EntityListeners(AuditingEntityListener.class)
public class AccountOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private Account account;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipment_id", referencedColumnName = "id")
    @JsonManagedReference
    private Shipment shipment;

    @Column(name = "order_status", nullable = false, length = 50)
    private String orderStatus;

    @Column(name = "order_number", nullable = false, length = 100)
    private String orderNumber;

    @Column(name = "order_total", nullable = false, precision=10, scale=2)
    private BigDecimal orderTotal;

    @Column(name = "order_commission", nullable = false, precision=10, scale=2, insertable = false, updatable = false)
    private BigDecimal orderCommission;

    @CreatedDate
    private Timestamp createdate;

    @OneToMany(mappedBy = "accountOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductOrder> productsOrdered = new ArrayList<>();

    public void addProductOrder(ProductOrder productOrder) {
        productsOrdered.add(productOrder);
        productOrder.setAccountOrder(this);
    }

    public void removeProductOrder(ProductOrder productOrder) {
        productsOrdered.remove(productOrder);
        productOrder.setAccountOrder(null);
    }
}