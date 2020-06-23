import { Component, OnInit } from '@angular/core';
import {Person} from "./model/person";
import {PersonService} from "../service/person.service";
import {Address} from "./model/Address";

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  person: Person;
  address: Address;
  submitted = false;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.person=new Person();
    this.address=new Address();
    this.person.addresses = [];
  }
  addAddress(address:Address): void{
    this.person.addresses.push(address);
    this.address=new Address();
  }
  onSubmit() { this.submitted = true; }
  deleteAddress(): void{
    this.person.addresses.pop();
  }
  addPerson(person:Person): void{

    this.personService
      .save(person)
      .subscribe(contact => {
        this.person=person;
      })
  }

}
