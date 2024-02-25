export class UserRequest
{
  _id:string;
  nom:string;
  prenom:string;
  email:string;
  password:string;
  contacts:Array<Array<string>>;
  estActif:boolean;
  passwordConfirmation:string;
  image:File;
  //salt:string
  /*UserRequest(nom,prenom,email,password,contacts){
    var userRequest=new UserRequest();
    this.nom=nom;
    this.prenom=prenom
    this.email=email;
    this.password=password;
    this.contacts=contacts;
  }*/


}
