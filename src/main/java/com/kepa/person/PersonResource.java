package com.kepa.person;


import com.kepa.company.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonResource {
    private PersonService personService;

    @Autowired
    public PersonResource(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("")
    public List<Person> findAll() {
        return personService.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Person> findById(@PathVariable Long id) {
        return personService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<Person> save(@RequestBody Person person) {
        if (person.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Zapisywany obiekt nie może mieć ustawionego id");
        System.out.println(person);
        Person savedPerson = personService.save(person);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedPerson.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedPerson);
    }

    @PutMapping("{id}")
    public ResponseEntity<Person> update(@RequestBody Person person, @PathVariable Long id) {
        if (!id.equals(person.getId()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aktualizowany obiekt musi mieć id zgodne z id w ścieżce zasobu");
        Person updatedPerson = personService.update(person);
        return ResponseEntity.ok(updatedPerson);
    }

    @DeleteMapping("delete-address/{addressId}")
    public ResponseEntity<PersonAddress> deleteAddress(@PathVariable Long addressId) {
        PersonAddress addressDeleted = personService.deleteAddress(addressId);
        return ResponseEntity.ok().body(addressDeleted);
    }

    @PostMapping("add-address/{personId}")
    public ResponseEntity<Person> addAddress(@RequestBody PersonAddress address, @PathVariable Long personId) {
        if (address.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Zapisywany obiekt nie może mieć ustawionego id");

        Person savedPerson = personService.saveAddress(address, personId);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedPerson.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedPerson);
    }
}
