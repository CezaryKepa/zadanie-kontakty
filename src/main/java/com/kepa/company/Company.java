package com.kepa.company;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.List;

@Entity
@Getter
@Setter
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String name;
    private String NIP;
    private String regon;
    private String KRS;
    private String legalForm;
    private String phone;
    @Email
    private String email;
    private String additionalInfo;
    @JsonManagedReference
    @OneToMany(mappedBy = "company", cascade=CascadeType.ALL)
    private List<Address> addresses;
    @JsonManagedReference
    @OneToMany(mappedBy = "company", cascade=CascadeType.ALL)
    private List<Employee> employees;
    private String wayOfObtaining;


}
