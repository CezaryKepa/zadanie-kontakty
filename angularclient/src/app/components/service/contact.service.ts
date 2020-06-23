import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../contact-list/model/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private ContactsUrl: string;

  constructor(private http: HttpClient) {
    this.ContactsUrl = 'http://localhost:8080/api/contacts';
  }

  public findAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.ContactsUrl);
  }
  public deleteContact (id: number, type:string): Observable<{}> {
    const url = `${this.ContactsUrl}/delete/${type}/${id}`;
    return this.http.delete(url);
  }


  public findAllByPhone(): Observable<Contact[]>{
  const url = `${this.ContactsUrl}/sort-by-phone`;

  return this.http.get<Contact[]>(url);
  }

  public findAllByEmail(): Observable<Contact[]>{
    const url = `${this.ContactsUrl}/sort-by-email`;

    return this.http.get<Contact[]>(url);
  }

  public findAllByType(): Observable<Contact[]>{
    const url = `${this.ContactsUrl}/sort-by-type`;

    return this.http.get<Contact[]>(url);
  }

  public findAllByName(): Observable<Contact[]>{
    const url = `${this.ContactsUrl}/sort-by-name`;

    return this.http.get<Contact[]>(url);
  }
}
