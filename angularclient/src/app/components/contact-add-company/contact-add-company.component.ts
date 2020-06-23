import { Component, OnInit } from '@angular/core';
import {Company} from "./model/Company";
import {CompanyService} from "../service/company.service";
import {Address} from "./model/Address";


@Component({
  selector: 'app-contact-add-company',
  templateUrl: './contact-add-company.component.html',
  styleUrls: ['./contact-add-company.component.css']
})
export class ContactAddCompanyComponent implements OnInit {
  company: Company;
  address: Address;
  submitted = false;


  constructor(private companyService: CompanyService) { }



  ngOnInit(): void {
    this.company=new Company();
    this.company.addresses = [];
    this.address=new Address();
  }
  addAddress(address:Address): void{
    this.company.addresses.push(address);
    this.address=new Address();
  }
  onSubmit() { this.submitted = true; }
  deleteAddress(): void{
    this.company.addresses.pop();
  }
  addCompany(company:Company): void{

    this.companyService
      .save(company)
      .subscribe(contact => {
        this.company=contact;
      })
  }

}
