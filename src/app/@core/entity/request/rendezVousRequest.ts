import { Service } from "../service";
import { User } from "../user";

export class RendezVousRequest
{
  client:User;
  montant:number;
  gestionnaire:string;
  prestations:Array<Service|User>;
  date:Date;
  dateFin:Date;
  autre:string;
}
