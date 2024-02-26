import { User } from "../user";

export class PrestationRequest {
    montant_total:number;
    client:User;
    gestionnaire:User;
    details:Array<any>;
    paiement:number;
    vers:number;
}
