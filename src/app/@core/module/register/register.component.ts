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
  userReq:UserRequest=new UserRequest();
  selectedFile?:File;
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
    this.user.passwordConfirmation=event.target.value;
    console.log(this.user);
  }

  selectFile(event:any){
    this.userReq.image=event.target.files[0];
    console.log(this.userReq);

  }

  register(){
    //this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
      //if(confirm){
        const formData:FormData=new FormData();

        this.isSpinner=true;

        this.userReq.nom=this.user.nom;
        this.userReq.prenom=this.user.prenom;
        this.userReq.email=this.user.email;
        this.userReq.password=this.user.password;
        this.userReq.passwordConfirmation=this.user.passwordConfirmation;

        let map=new Map<string,string>();
        map.set("num1","0355555555");
        map.set("num2","03222222");
        this.userReq.contacts=Array.from(map.entries());
        console.log(this.userReq);
        let obj={
          nom:this.user.nom,
          prenom:this.user.prenom,
          email:this.user.email,
          password:this.user.password,
          passwordConfirmation:this.user.passwordConfirmation,
          contacts:this.userReq.contacts
        }
        //userReq.contacts=map;
        formData.append('user',JSON.stringify(obj));
        formData.append('image',this.userReq.image);
        //formData.append("file",this.selectedFile);


       if(this.user.password==this.user.passwordConfirmation){
        this.userService.createUser(true,formData).subscribe({
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

      //}
    //})
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
