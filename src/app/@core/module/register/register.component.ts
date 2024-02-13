import { Component, OnInit } from '@angular/core';
import { MessageModalService } from '../../services/message-modal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../entity/user';

import { UserRequest } from '../../entity/request/userRequest';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide1 = true;
  hide2=true;
  user:User=new User();
  validateEmail:boolean=true;
  isSpinner:boolean=false;
  confirmPassword:string;
  errorConfirmationPassword:boolean=false;
  constructor(private messageModalService: MessageModalService,public dialogRef: MatDialogRef<RegisterComponent>,private userService:UserService){

  }
  ngOnInit(): void {

  }

  confirmPass(event:any){
    this.confirmPassword=event.target.value;
    console.log(this.confirmPassword);
  }

  register(){
    this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
      if(confirm){
        this.isSpinner=true;
        let userReq=new UserRequest();
        userReq.nom=this.user.nom;
        userReq.prenom=this.user.prenom;
        userReq.email=this.user.email;
        userReq.password=this.user.password;
        let map=new Map<string,string>();
        map.set("num1","161515151515");
        map.set("num2","115115151515151515");
        //userReq.contacts=JSON.stringify(Object.fromEntries(map));
        console.log(userReq);

        //userReq.contacts=map;
       if(this.user.password==this.confirmPassword){
        this.userService.createUser(true,userReq).subscribe({
          next:(data)=>{
            this.isSpinner=false;
            this.dialogRef.close();
          },
          error:(err)=>{
            console.log(err);
            console.log("erreur");
          }
        });
       }
       else{
        this.isSpinner=false;
        this.errorConfirmationPassword=true;
       }

      }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
