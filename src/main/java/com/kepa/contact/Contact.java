package com.kepa.contact;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Contact {

    private Long id;
    private String name;
    private String type;
    private String email;
    private String phone;

    public Contact(String name, String type, String email, String phone) {
        this.name = name;
        this.type = type;
        this.email = email;
        this.phone = phone;
    }
}
