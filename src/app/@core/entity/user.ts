import { Groupe } from "./groupe";
import { Service } from "./service";

export class User{
  nom:string;
  prenom:string;
  email:string;
  password:string;
  estVerifie:boolean;
  estActif:boolean;
  salt:string;
  groupes:Array<Groupe>=[];
  contacts:Map<string,string>;
  compte:Map<number,number>;
  preferences:Array<Array<Groupe>|Array<Service>>;
}
