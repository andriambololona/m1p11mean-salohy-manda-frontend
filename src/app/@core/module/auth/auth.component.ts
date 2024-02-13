import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../entity/user';
import { UserRequest } from '../../entity/request/userRequest';
import { TokenStorageService } from '../../services/token-storage.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user=new User();
  loading:boolean = false;
  hide = true;
  isLoginSuccessfull: boolean = false;
  validateEmail:boolean=true;
  isSpinner:boolean=false;
  isDisabledButton:boolean=true;
  @Output() authUser=new EventEmitter();
  errorMessage:string;
  constructor(public dialogRef: MatDialogRef<AuthComponent>,private userService:UserService,private tokenStorageService:TokenStorageService){

  }
  ngOnInit() {
    this.user.email="salohy@gmail.com";
    this.user.password="password";
  }

  Login(){
    this.isSpinner=true;
    var userRequest=new UserRequest();
    userRequest.email=this.user.email;
    userRequest.password=this.user.password;
    console.log(userRequest);

    this.userService.login(true,userRequest).subscribe({
      next:(data:HttpResponse<any>)=>{
        this.tokenStorageService.saveRole(data.body.roles);
        this.tokenStorageService.saveId(data.body.id);
        this.tokenStorageService.saveEmail(data.body.email);
        this.authUser.emit(data);
        this.isSpinner=false;
        this.dialogRef.close();

      },error:(err)=>{
        this.isSpinner=false;
       this.errorMessage="Identifiant ou mot de passe erroné";
      }
    });
   //this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  login(): void{

  }

  convertErrors(errors: Array<string> ): Array<string>{
    errors.forEach((element, index) => {
      if (errors[index] == "Something went wrong, please try again."){
        errors[index] = "Une erreur s'est produite. Veuillez contacter l'admnistrateur";
      }
    });
    return errors;
  }

  convertMessages(messages: Array<string> ): Array<string>{
    messages.forEach((element, index) => {
      if (messages[index] == "You have been successfully authenticated."){
        messages[index] = "Authentification éffectuée avec succès.";
      }
    });
    return messages;
  }

  /*getConfigValue(key: string): any{
    return super.getConfigValue(key);
  }*/


}
