package com.kepa.person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonAdressRepository extends JpaRepository<PersonAddress,Long> {
}
