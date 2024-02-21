import { Service } from "./service";
import { User } from "./user";

export class Rendezvous
{
  _id?:string;
  client:User;
  montant:number;
  gestionnaire:User;
  prestations:Array<Service|User>;
  date:Date;
  dateFin:Date;
  estRealise:boolean;
  autre:string;
}
