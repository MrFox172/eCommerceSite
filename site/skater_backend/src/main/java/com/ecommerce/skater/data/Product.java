package com.ecommerce.skater.data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "product")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@EntityListeners(AuditingEntityListener.class)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "seller_account_id", referencedColumnName = "id")
    @JsonBackReference
    private SellerAccount sellerAccount;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "description", nullable = false, length = 300)
    private String description;

    @Column(name = "price", nullable = false, length = 50, precision=10, scale=2)
    private BigDecimal price;

    @Column(name = "sale_percent", nullable = false, precision=10, scale=2)
    private BigDecimal salePercent;

    @Column(name = "sale_price", nullable = false, insertable = false, updatable = false, precision=10, scale=2)
    private BigDecimal salePrice;

    // create a compute variable for that returns a boolean based on salePrice and price
    public boolean isOnSale() {
        return salePercent.compareTo(BigDecimal.valueOf(0.0)) > 0.0;
    }

    @Column(name = "brand", nullable = false, length = 200)
    private String brand;

    @Column(name = "stock_on_hand", nullable = false)
    private int stockOnHand;

    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonManagedReference
    private Category category;

    @Column(name = "tags", nullable = false, length = 500)
    private String tags;

    @CreatedDate
    private Timestamp createdate;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductImage> productImages;

    // add a new ProductImage to the product
    public void addProductImage(ProductImage productImage) {
        productImages.add(productImage);
        productImage.setProduct(this);
    }

}