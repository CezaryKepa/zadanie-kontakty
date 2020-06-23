package com.kepa.company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdressRepository extends JpaRepository<Address,Long> {
    List<Address> findAllByCompanyId(Long company_id);
    Optional<Address> findByName(String Name);

}
