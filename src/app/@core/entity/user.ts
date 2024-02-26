import { Groupe } from "./groupe";
import { Service } from "./service";

export class User{
  constructor(){

  }
  _id:string;
  nom:string;
  prenom:string;
  email:string;
  password:string;
  passwordConfirmation:string;
  estVerifie:boolean;
  estActif:boolean;
  salt:string;
  groupes:Array<Groupe>=[];
  contacts:Map<string,string>;
  compte:Map<number,number>;
  preferences:Array<Array<User>|Array<Service>>;
  horaireTravail:any;

}
