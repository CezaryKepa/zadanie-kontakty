import { Component, OnInit } from '@angular/core';
import {Company} from "../contact-add-company/model/Company";
import {Address} from "../contact-add-company/model/Address";
import {CompanyService} from "../service/company.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company: Company;
  address: Address;
  id:number;
  sub:Subscription;
  submitted = false;


  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.address=new Address();
    this.getCompany(this.id);

  }

  addAddress(address: Address): void{
    this.companyService
      .addAddress(address, this.id)
      .subscribe(()=> {
        this.getCompany(this.id);
      });
  }
  deleteAddress(): void{
    const addressToDelete = this.company.addresses.pop();
    this.company.addresses.push(addressToDelete);
    this.companyService
      .deleteAddress(addressToDelete.id)
      .subscribe(()=> {
        this.getCompany(this.id);
      });

  }
  onSubmit() { this.submitted = true; }

  getCompany(id: number): void{
    this.companyService.get(id).subscribe(data =>{
      this.company=data;
    });
  }

  updateCompany(company:Company): void{
    this.companyService
      .update(company,this.id)
      .subscribe(company => {
        this.company=company;
      })
  }

}
