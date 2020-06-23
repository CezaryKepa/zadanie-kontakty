import { Component, OnInit } from '@angular/core';

import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Person} from "../contact-add-person/model/person";
import {Address} from "../contact-add-person/model/Address";
import {PersonService} from "../service/person.service";

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  person: Person;
  address: Address;
  id:number;
  sub:Subscription;
  submitted = false;

  constructor(private personService: PersonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.address=new Address();

    this.getPerson(this.id);

  }
  onSubmit() { this.submitted = true; }
  addAddress(address: Address): void{
    this.personService
      .addAddress(address, this.id)
      .subscribe(()=> {
        this.getPerson(this.id);
      });
  }

  deleteAddress(): void{
    const addressToDelete = this.person.addresses.pop();
    this.person.addresses.push(addressToDelete);

    this.personService
      .deleteAddress(addressToDelete.id)
      .subscribe(()=> {
        this.getPerson(this.id);
      });

  }

  getPerson(id: number): void{
    this.personService.get(id).subscribe(data =>{
      this.person=data;
    });
  }

  updatePerson(person:Person): void{
    this.personService
      .update(person,this.id)
      .subscribe(person => {
        this.person=person;
      });

    this.getPerson(this.id);
  }


}
