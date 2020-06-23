package com.kepa.person;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Email;
import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String name;
    private String surname;
    private String PESEL;
    private String phone;
    @Email
    private String email;
    private String additionalInfo;
    @JsonManagedReference
    @OneToMany(mappedBy = "person", cascade=CascadeType.ALL)
    private List<PersonAddress> addresses;
    private String wayOfObtaining;

}