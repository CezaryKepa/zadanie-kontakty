package com.kepa.person;

import com.kepa.company.exceptions.AddressNotFoundException;
import com.kepa.contact.ContactNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    private PersonRepository personRepository;
    private PersonAdressRepository personAdressRepository;

    @Autowired
    public PersonService(PersonRepository personRepository, PersonAdressRepository personAdressRepository) {
        this.personRepository = personRepository;
        this.personAdressRepository = personAdressRepository;
    }

    List<Person> findAll(){
        return personRepository.findAll();
    }

    Optional<Person> findById(Long id) {
        return personRepository.findById(id);
    }
    Person save(Person person) {
        Optional<Person> personByPesel = personRepository.findByPESEL(person.getPESEL());
        personByPesel.ifPresent(u -> {
            throw new DuplicateException();
        });
        person.setType("Osoba fizyczna");
        personRepository.save(person);
        List<PersonAddress> addresses = person.getAddresses();
        addresses.forEach(e -> {
            e.setPerson(person);
            personAdressRepository.save(e);
        });
        return person;
    }

    public Person update(Person person) {
        Optional<Person> personByPesel = personRepository.findByPESEL(person.getPESEL());
        personByPesel.ifPresent(c -> {
            if (!c.getId().equals(person.getId()))
                throw new DuplicateException();
        });
        personRepository.save(person);
        List<PersonAddress> addresses = person.getAddresses();
        addresses.forEach(e -> {
            e.setPerson(person);
            personAdressRepository.save(e);
        });
        return person;
    }

    public PersonAddress deleteAddress(Long addressId) {
        Optional<PersonAddress> companyAddress = personAdressRepository.findById(addressId);
        PersonAddress addressEntity = companyAddress.orElseThrow(AddressNotFoundException::new);
        personAdressRepository.deleteById(addressId);
        return addressEntity;
    }

    public Person saveAddress(PersonAddress address, Long personId) {
        Optional<Person> personById = personRepository.findById(personId);
        Person personEntity = personById.orElseThrow(ContactNotFoundException::new);
        address.setPerson(personEntity);
        personAdressRepository.save(address);
        return personEntity;
    }
}
