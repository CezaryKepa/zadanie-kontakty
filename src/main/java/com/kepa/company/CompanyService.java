package com.kepa.company;


import com.kepa.company.exceptions.AddressNotFoundException;
import com.kepa.company.exceptions.DuplicateException;
import com.kepa.company.exceptions.EmployeeNotFoundException;
import com.kepa.contact.ContactNotFoundException;
import com.kepa.person.Person;
import com.kepa.person.PersonAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    private CompanyRepository companyRepository;
    private AdressRepository adressRepository;
    private EmployeeRepository employeeRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository, AdressRepository adressRepository, EmployeeRepository employeeRepository) {
        this.companyRepository = companyRepository;
        this.adressRepository = adressRepository;
        this.employeeRepository = employeeRepository;
    }

    List<Company> findAll() {
        return companyRepository.findAll();
    }

    Optional<Company> findById(Long id) {
        Optional<Company> company = companyRepository.findById(id);

        company.ifPresent(e -> {
            e.setAddresses(adressRepository.findAllByCompanyId(e.getId()));
            e.setEmployees(employeeRepository.findAllByCompanyId(e.getId()));
        });

        return company;
    }

    Company save(Company company) {
        Optional<Company> companyByNip = companyRepository.findByNIP(company.getNIP());
        companyByNip.ifPresent(c -> {
            throw new DuplicateException();
        });
        company.setType("Firma");

        companyRepository.save(company);

        List<Address> addresses = company.getAddresses();

        addresses.forEach(e -> {
            e.setCompany(company);
            adressRepository.save(e);
        });
        return company;
    }


    public Company update(Company company) {
        Optional<Company> companyByNip = companyRepository.findByNIP(company.getNIP());
        companyByNip.ifPresent(c -> {
            if (!c.getId().equals(company.getId()))
                throw new DuplicateException();
        });
        companyRepository.save(company);
        List<Address> addresses = company.getAddresses();
        addresses.forEach(e -> {
            e.setCompany(company);
            adressRepository.save(e);
        });
        return company;
    }

    public Address deleteAddress(Long addressId) {
        Optional<Address> companyAddress = adressRepository.findById(addressId);
        Address addressEntity = companyAddress.orElseThrow(AddressNotFoundException::new);
        adressRepository.deleteById(addressId);
        return addressEntity;
    }


    public Company updateEmployee(Employee employee,Long companyId) {
        Optional<Employee> employeeById = employeeRepository.findById(employee.getId());
        employeeById.ifPresent(c -> {
            if (!c.getId().equals(employee.getId()))
                throw new DuplicateException();
        });
        Optional<Company> companyById = findById(companyId);
        Company companyEntity = companyById.orElseThrow(() -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie ma firmy o takim ID");
                }
        );
        employee.setCompany(companyEntity);
        employeeRepository.save(employee);
        return companyEntity;
    }

    public Employee deleteEmployee(Long employeeId) {
        Optional<Employee> companyEmployee = employeeRepository.findById(employeeId);
        Employee employeeEntity = companyEmployee.orElseThrow(EmployeeNotFoundException::new);
        employeeRepository.deleteById(employeeId);
        return employeeEntity;
    }

    public Company addEmployee(Employee employee, Long companyId) {
        Optional<Company> companyById = findById(companyId);

        Company companyEntity = companyById.orElseThrow(() -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie ma firmy o takim ID");
                }
        );

        employee.setStatus(false);
        employee.setCompany(companyEntity);
        employeeRepository.save(employee);

        return companyEntity;
    }

    public Company saveAddress(Address address, Long companyId) {
        Optional<Company> companyById = companyRepository.findById(companyId);
        Company companyEntity = companyById.orElseThrow(ContactNotFoundException::new);
        address.setCompany(companyEntity);
        adressRepository.save(address);
        return companyEntity;
    }
}
