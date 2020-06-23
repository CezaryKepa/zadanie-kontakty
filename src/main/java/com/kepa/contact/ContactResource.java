package com.kepa.contact;

import com.kepa.company.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactResource {
    private ContactService contactService;

    @Autowired
    public ContactResource(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("")
    public List<Contact> findAll() {
        return contactService.findAll();
    }
    @GetMapping("sort-by-phone")
    public List<Contact> findAllByPhone() {
        return contactService.findAllByPhone();
    }
    @GetMapping("sort-by-name")
    public List<Contact> findAllByName() {
        return contactService.findAllByName();
    }
    @GetMapping("sort-by-email")
    public List<Contact> findAllByEmail() { return contactService.findAllByEmail(); }
    @GetMapping("sort-by-type")
    public List<Contact> findAllByType() {
        return contactService.findAllByType();
    }


    @DeleteMapping("delete/{type}/{contactId}")
    public ResponseEntity deleteContact(@PathVariable Long contactId,@PathVariable String type) {
        Contact contactDeleted = contactService.delete(type,contactId);
        return ResponseEntity.ok().body(contactDeleted);
    }

}
