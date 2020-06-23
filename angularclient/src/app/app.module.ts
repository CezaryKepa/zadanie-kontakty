import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyService } from './components/service/company.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import {ContactService} from "./components/service/contact.service";
import { ContactAddComponent } from './components/contact-add-person/contact-add.component';
import { ContactAddCompanyComponent } from './components/contact-add-company/contact-add-company.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PersonService} from "./components/service/person.service";
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import {
  CompanyDetailsEmployeesComponent,
  NgbdModalContent, NgbdModalContent2
} from './components/company-details-employees/company-details-employees.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxMaskModule, IConfig} from "ngx-mask";




export const options: Partial<IConfig> | (() => Partial<IConfig>)=null;

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactAddComponent,
    ContactAddCompanyComponent,
    CompanyEditComponent,
    PersonEditComponent,
    PersonDetailsComponent,
    CompanyDetailsComponent,
    CompanyDetailsEmployeesComponent,
    NgbdModalContent,
    NgbdModalContent2,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,



  ],
  providers: [CompanyService,ContactService,PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
