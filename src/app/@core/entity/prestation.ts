import { User } from "./user";

export class Prestation
{
  montant_total:number;
  client:User;
  details:Array<any>;
  paiement:number;
  vers:number;
}
