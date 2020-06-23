import { Component, OnInit } from '@angular/core';
import {Contact} from "./model/contact";
import {ContactService} from "../service/contact.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  p: number = 1;
  contacts: Contact[];
  isSortedByPhone: boolean;
  isSortedByEmail: boolean;
  isSortedByType: boolean;
  isSortedByName: boolean;



  constructor(private contactService: ContactService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.fetchData();
    this.sortByName();
  }

  fetchData() {
    this.contactService.findAll().subscribe(data => {
      this.contacts = data;
    });
  }

  deleteContact(contact:Contact): void{
    this.contactService
      .deleteContact(Number(contact.id),contact.type)
      .subscribe(()=> {
        this.fetchData();
      })
  }



  sortByPhone() {
    if(this.isSortedByPhone) {
      this.contactService.findAllByPhone().subscribe(data => {
        this.contacts = data;
        this.contacts.reverse();
        this.isSortedByPhone=false;
      });
    }
    else {
      this.contactService.findAllByPhone().subscribe(data => {
        this.contacts = data;
        this.isSortedByPhone=true;
      });
    }
  }
  sortByEmail() {
    if(this.isSortedByEmail) {
      this.contactService.findAllByEmail().subscribe(data => {
        this.contacts = data;
        this.contacts.reverse();
        this.isSortedByEmail=false;
      });
    }
    else {
      this.contactService.findAllByEmail().subscribe(data => {
        this.contacts = data;
        this.isSortedByEmail=true;
      });
    }
  }
  sortByType() {
    if(this.isSortedByType) {
      this.contactService.findAllByType().subscribe(data => {
        this.contacts = data;
        this.contacts.reverse();
        this.isSortedByType=false;
      });
    }
    else {
      this.contactService.findAllByType().subscribe(data => {
        this.contacts = data;
        this.isSortedByType=true;
      });
    }
  }
  sortByName() {
    if(this.isSortedByName) {
      this.contactService.findAllByName().subscribe(data => {
        this.contacts = data;
        this.contacts.reverse();
        this.isSortedByName=false;
      });
    }
    else {
      this.contactService.findAllByName().subscribe(data => {
        this.contacts = data;
        this.isSortedByName=true;
      });
    }
  }

}
