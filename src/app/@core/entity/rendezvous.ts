import { Service } from "./service";
import { User } from "./user";

export class Rendezvous
{
  client:User;
  montant:number;
  gestionnaire:User;
  prestations:Array<Service|User>;
  date:Date;
  dateFin:Date;
}
