package com.kepa.company;

import com.kepa.person.Person;
import com.kepa.person.PersonAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/company")
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyResource {

    private CompanyService companyService;

    @Autowired
    public CompanyResource(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("")
    public List<Company> findAll() {
        return companyService.findAll();
    }
    @GetMapping("{id}")
    public ResponseEntity<Company> findById(@PathVariable Long id) {
        return companyService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("")
    public ResponseEntity<Company> save(@RequestBody Company company) {
        if (company.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Zapisywany obiekt nie może mieć ustawionego id");
        System.out.println(company);
        Company savedCompany = companyService.save(company);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedCompany.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedCompany);
    }

    @PostMapping("{companyId}/employee-add")
    public ResponseEntity<Company> addEmployee(@RequestBody Employee employee,@PathVariable Long companyId) {
        if (employee.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Zapisywany obiekt nie może mieć ustawionego id");
        System.out.println(employee);
        Company savedEmployee = companyService.addEmployee(employee,companyId);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedEmployee.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedEmployee);
    }
    @PutMapping("{id}")
    public ResponseEntity<Company> update(@RequestBody Company company, @PathVariable Long id) {
        if (!id.equals(company.getId()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aktualizowany obiekt musi mieć id zgodne z id w ścieżce zasobu");
        Company updatedCompany = companyService.update(company);
        return ResponseEntity.ok(updatedCompany);
    }
    @PutMapping("{companyId}/update-employee")
    public ResponseEntity<Company> updateEmployee(@RequestBody Employee employee, @PathVariable Long companyId) {

        Company updatedCompany = companyService.updateEmployee(employee, companyId);
        return ResponseEntity.ok(updatedCompany);
    }
    @DeleteMapping("delete-address/{addressId}")
    public ResponseEntity deleteAddress(@PathVariable Long addressId) {
        Address addressDeleted = companyService.deleteAddress(addressId);
        return ResponseEntity.ok().body(addressDeleted);
    }
    @DeleteMapping("delete-employee/{employeeId}")
    public ResponseEntity deleteEmployee(@PathVariable Long employeeId) {
        Employee employeeDeleted = companyService.deleteEmployee(employeeId);
        return ResponseEntity.ok().body(employeeDeleted);
    }
    @PostMapping("add-address/{companyId}")
    public ResponseEntity addAddress(@RequestBody Address address, @PathVariable Long companyId) {
        if (address.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Zapisywany obiekt nie może mieć ustawionego id");

        Company savedAddress = companyService.saveAddresss(address,companyId);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedAddress.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedAddress);
    }



}
