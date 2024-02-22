import { Service } from "./service";
import { User } from "./user";

export class Rendezvous
{
  _id?:string;
  client:User;
  montant:number;
  gestionnaire:string;
  prestations:any;
  date:Date;
  dateFin:Date;
  estRealise:boolean;
  autre:string;
}
