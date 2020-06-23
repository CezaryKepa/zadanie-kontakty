package com.kepa.contact;

import com.kepa.company.Company;
import com.kepa.company.CompanyRepository;
import com.kepa.person.Person;
import com.kepa.person.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContactService {
    PersonRepository personRepository;
    CompanyRepository companyRepository;

    @Autowired
    public ContactService(PersonRepository personRepository, CompanyRepository companyRepository) {
        this.personRepository = personRepository;
        this.companyRepository = companyRepository;
    }

    List<Contact> findAll(){
        List<Person> persons = personRepository.findAll();
        List<Company> companies = companyRepository.findAll();
        List<Contact> contacts = new ArrayList<>();
        persons.forEach(e->{
            Contact contact=new Contact();
            contact.setId(e.getId());
            contact.setEmail(e.getEmail());
            contact.setPhone(e.getPhone());
            contact.setName(e.getName());
            contact.setType(e.getType());
            contacts.add(contact);
        });
        companies.forEach(e->{
            Contact contact=new Contact();
            contact.setId(e.getId());
            contact.setEmail(e.getEmail());
            contact.setPhone(e.getPhone());
            contact.setName(e.getName());
            contact.setType(e.getType());
            contacts.add(contact);
        });

        return contacts;
    }


    public Contact delete(String type, Long contactId) {
        if(type.equals("Firma")) {
            Optional<Company> copmpanyContact = companyRepository.findById(contactId);
            Company companyEntity = copmpanyContact.orElseThrow(ContactNotFoundException::new);
            companyRepository.deleteById(contactId);
            return new Contact(companyEntity.getName(),companyEntity.getType(),companyEntity.getEmail(),companyEntity.getPhone());
        }
        else if(type.equals("Osoba fizyczna")){
            Optional<Person> personContact = personRepository.findById(contactId);
            Person personEntity = personContact.orElseThrow(ContactNotFoundException::new);
            personRepository.deleteById(contactId);
            return new Contact(personEntity.getName(),personEntity.getType(),personEntity.getEmail(),personEntity.getPhone());
        }

            throw new ContactNotFoundException();
    }

    public List<Contact> findAllByPhone() {
        return sort(Comparator.comparing(Contact::getPhone));
    }

    public List<Contact> findAllByName() {
        return sort(Comparator.comparing(Contact::getName));
    }

    public List<Contact> findAllByEmail() {
        return sort(Comparator.comparing(Contact::getEmail));
    }

    public List<Contact> findAllByType() {
        return sort(Comparator.comparing(Contact::getType));
    }

    private List<Contact> sort(Comparator<Contact> comparator) {
        List<Contact> contacts = findAll();
        return contacts.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }
}
