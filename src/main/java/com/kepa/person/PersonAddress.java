package com.kepa.person;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class PersonAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String street;
    private Integer buildingNumber;
    private Integer apartmentNumber;
    private String zip;
    private String city;
    @JsonBackReference
    @ManyToOne
    private Person person;

}
