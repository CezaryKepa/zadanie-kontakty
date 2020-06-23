import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Company} from "../contact-add-company/model/Company";
import {CompanyService} from "../service/company.service";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  company:Company;
  id:number;
  sub:Subscription;

  constructor(private personService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getPerson(this.id);
  }

  getPerson(id: number): void{
    this.personService.get(id).subscribe(data =>{
      this.company=data;
    });
  }
}
