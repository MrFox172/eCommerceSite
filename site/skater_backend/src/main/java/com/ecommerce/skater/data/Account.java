package com.ecommerce.skater.data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "account")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@EntityListeners(AuditingEntityListener.class)
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname;

    private String lastname;

    private String emailaddress;

    @JsonIgnore
    private String password;

    private String phonenumber;

    @Column(name = "is_verified")
    private boolean isVerified;

    @JsonIgnore
    @Column(name = "verification_token")
    private String verificationToken;

    @CreatedDate
    private Timestamp createdate;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Address> addresses = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "account_id")
    @JsonManagedReference
    private SellerAccount sellerAccount;

    public Account() {
    }

    public Account(String firstname, String lastname, String emailaddress, String password, String phonenumber) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.emailaddress = emailaddress;
        this.password = password;
        this.phonenumber = phonenumber;
    }

    public void addAddress(Address address) {
        addresses.add(address);
        address.setAccount(this);
    }

    public void removeAddress(Address address) {
        addresses.remove(address);
        address.setAccount(null);
    }
}
