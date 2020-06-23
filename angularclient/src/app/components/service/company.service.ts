import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from "../contact-add-company/model/Company";
import {Address} from "../contact-add-company/model/Address";
import {Employee} from "../contact-add-company/model/Employee";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private CompaniesUrl: string;

  constructor(private http: HttpClient) {
    this.CompaniesUrl = 'http://localhost:8080/api/company';
  }

  public findAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.CompaniesUrl);
  }
  public get(id: number): Observable<Company> {
    const url = `${this.CompaniesUrl}/${id}`;
    return this.http.get<Company>(url);
  }
  public save(Company: Company) {
    return this.http.post<Company>(this.CompaniesUrl, Company);
  }
  public update(Company: Company,id: number) {
    const url = `${this.CompaniesUrl}/${id}`;
    return this.http.put<Company>(url, Company);
  }
  public addAddress(address: Address, id: number): Observable<{}>{
    const url = `${this.CompaniesUrl}/add-address/${id}`;
    return this.http.post<Address>(url, address);
  }
  public deleteAddress(id: string): Observable<{}> {
    const url = `${this.CompaniesUrl}/delete-address/${id}`;
    return this.http.delete(url);
  }
  public updateEmployee(employee: Employee, companyId: string){
    const url = `${this.CompaniesUrl}/${companyId}/update-employee`;
    return this.http.put<Company>(url, employee)
  }

  public deleteEmployee(id: number): Observable<{}> {
    const url = `${this.CompaniesUrl}/delete-employee/${id}`;
    return this.http.delete(url);
  }

  public addEmployee(employee: Employee, id: string) {
    const url = `${this.CompaniesUrl}/${id}/employee-add`;
    return this.http.post<Company>(url, employee)
  }
}
