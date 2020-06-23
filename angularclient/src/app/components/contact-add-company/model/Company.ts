import {Address} from "./Address";
import {Employee} from "./Employee";

export class Company {
   id: string;
   name: string;
   nip: string;
   regon: string;
   krs: string;
   legalForm: string;
   phone: string;
   email: string;
   additionalInfo: string;
   addresses: Address[];
   employees: Employee[];
   wayOfObtaining: string;

}
