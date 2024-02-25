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
    this.selectedFile=event.target.files[0];
  }

  register(){
    this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
      if(confirm){
        const formData:FormData=new FormData();
        
        this.isSpinner=true;
        let userReq=new UserRequest();
        userReq.nom=this.user.nom;
        userReq.prenom=this.user.prenom;
        userReq.email=this.user.email;
        userReq.password=this.user.password;
        userReq.passwordConfirmation=this.user.passwordConfirmation;

        let map=new Map<string,string>();
        map.set("num1","0355555555");
        map.set("num2","03222222");
        userReq.contacts=Array.from(map.entries());
        console.log(userReq);

        //userReq.contacts=map;
        formData.append('andrana',JSON.stringify(userReq));
        //formData.append("file",this.selectedFile);
        console.log(formData.get('andrana'));
        
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

      }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
