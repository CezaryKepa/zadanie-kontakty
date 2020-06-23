import {Company} from "./Company";

export class Address {
  id: string;
  name: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  zip: string;
  city: string;
  company:Company;
}
