import { Component, OnInit } from '@angular/core';
import {Person} from "../contact-add-person/model/person";
import {Subscription} from "rxjs";
import {PersonService} from "../service/person.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  person:Person;
  id:number;
  sub:Subscription;

  constructor(private personService: PersonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getPerson(this.id);
  }

  getPerson(id: number): void{
    this.personService.get(id).subscribe(data =>{
      this.person=data;
    });
  }
}
