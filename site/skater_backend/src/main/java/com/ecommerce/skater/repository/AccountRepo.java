package com.ecommerce.skater.repository;

import com.ecommerce.skater.data.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepo extends JpaRepository<Account, Integer> {

    Account findOneByEmailaddress(String emailaddress);

    String findPasswordByEmailaddress(String emailaddress);

    Boolean existsByEmailaddressAndPassword(String emailaddress, String password);

    Account findOneByEmailaddressAndPassword(String emailaddress, String password);

    Account findOneByIdAndVerificationToken(int id, String verificationToken);

}
