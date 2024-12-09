package com.ecommerce.skater.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

/**
 * Mapping for DB view
 */
@Getter
@Setter
@Entity
@Immutable
@Table(name = "revenue")
public class Revenue {

    @Id
    @Column(name = "sold_count", precision = 32 , insertable = false, updatable = false)
    private int soldCount;

    @Column(name = "total_revenue", precision = 32, scale = 2 , insertable = false, updatable = false)
    private BigDecimal totalRevenue;

    @Column(name = "revenue", precision = 35, scale = 2 , insertable = false, updatable = false)
    private BigDecimal revenue;

}