package com.ecommerce.skater.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

/**
 * Mapping for DB view
 */
@Getter
@Setter
@Entity
@Immutable
@Table(name = "metrics")
public class Metric {
    @Id
    @Column(name = "account_count", insertable = false, updatable = false)
    private int accountCount;

    @Column(name = "order_count", nullable = false, insertable = false, updatable = false)
    private int orderCount;

    @Column(name = "product_count", nullable = false, insertable = false, updatable = false)
    private int productCount;

    @Column(name = "seller_count", nullable = false, insertable = false, updatable = false)
    private int sellerCount;

}