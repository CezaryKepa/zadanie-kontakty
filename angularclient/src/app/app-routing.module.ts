import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactListComponent} from "./components/contact-list/contact-list.component";
import {ContactAddComponent} from "./components/contact-add-person/contact-add.component";
import {ContactAddCompanyComponent} from "./components/contact-add-company/contact-add-company.component";
import {CompanyEditComponent} from "./components/company-edit/company-edit.component";
import {PersonEditComponent} from "./components/person-edit/person-edit.component";
import {PersonDetailsComponent} from "./components/person-details/person-details.component";
import {CompanyDetailsComponent} from "./components/company-details/company-details.component";
import {CompanyDetailsEmployeesComponent} from "./components/company-details-employees/company-details-employees.component";


const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'add-person', component: ContactAddComponent },
  { path: 'add-company', component: ContactAddCompanyComponent },
  { path: 'company-edit/:id', component: CompanyEditComponent },
  { path: 'person-edit/:id', component: PersonEditComponent },
  { path: 'person-details/:id', component: PersonDetailsComponent },
  { path: 'company-details/:id', component: CompanyDetailsComponent },
  { path: 'company-details-employees/:id', component: CompanyDetailsEmployeesComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
