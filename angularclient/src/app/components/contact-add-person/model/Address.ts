import {Person} from "./person";

export class Address {
  id: string;
  name: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  zip: string;
  city: string;
  person:Person;
}
