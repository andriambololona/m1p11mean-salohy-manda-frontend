export class User{
  nom:string;
  prenom:string;
  email:string;
  password:string;
  est_verifie:boolean;
  salt:string;
  groupes:any;
  contacts:string;
  compte:number;
  preferences:Array<any>;
}
