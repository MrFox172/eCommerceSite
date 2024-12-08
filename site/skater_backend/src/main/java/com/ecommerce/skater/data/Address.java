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

import java.sql.Timestamp;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "address")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@EntityListeners(AuditingEntityListener.class)
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @JsonBackReference
    private Account account;

    @Column(name = "recipient_name", nullable = false, length = 50)
    private String recipientName;

    @Column(name = "street", nullable = false, length = 50)
    private String street;

    @Column(name = "city", nullable = false, length = 50)
    private String city;

    @Column(name = "state", nullable = false, length = 50)
    private String state;

    @Column(name = "zip", nullable = false, length = 50)
    private String zip;

    @CreatedDate
    private Timestamp createdate;

}