package com.ecommerce.skater.data;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "product_image")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@EntityListeners(AuditingEntityListener.class)
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @CreatedDate
    private Timestamp createdate;

}