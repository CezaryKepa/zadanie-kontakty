import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../contact-add-person/model/person";
import {Address} from "../contact-add-person/model/Address";


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private PersonsUrl: string;

  constructor(private http: HttpClient) {
    this.PersonsUrl = 'http://localhost:8080/api/person';
  }

  public findAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.PersonsUrl);
  }

  public save(person: Person) {
    return this.http.post<Person>(this.PersonsUrl, person);
  }

  public get(id: number): Observable<Person> {
    const url = `${this.PersonsUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  public update(person: Person,id: number) {
    const url = `${this.PersonsUrl}/${id}`;
    return this.http.put<Person>(url, person);
  }
  public addAddress(address: Address, id: number): Observable<{}>{
    const url = `${this.PersonsUrl}/add-address/${id}`;
    return this.http.post<Address>(url, address);
  }
  public deleteAddress(id: string): Observable<{}> {
    const url = `${this.PersonsUrl}/delete-address/${id}`;
    return this.http.delete(url);
  }
}
