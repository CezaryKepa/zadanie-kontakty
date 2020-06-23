import {Address} from "./Address";

export class Person {
  id: string;
  name: string;
  surname: string;
  pesel: string;
  phone: string;
  email: string;
  additionalInfo: string;
  addresses: Address[];
  wayOfObtaining: string;

}
