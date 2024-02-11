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
  constructor(private messageModalService: MessageModalService,public dialogRef: MatDialogRef<RegisterComponent>,private userService:UserService){

  }
  ngOnInit(): void {

  }
  register(){
    this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
      if(confirm){
        let userReq=new UserRequest();
        userReq.nom="salohy";
        userReq.prenom="prenom";
        userReq.email="salohy@gmail.com";
        userReq.password="password";
        //userReq.salt="salt";
        let map=new Map<string,string>();
        map.set("num1","161515151515");
        map.set("num2","115115151515151515");
        //userReq.contacts=map;
        console.log(userReq);

        this.userService.createUser(true,userReq).subscribe((data)=>{
          //console.log(data);
          //console.log('success');
          this.dialogRef.close();

        },(err)=>{
          console.log(err);

          console.log("erreur");

        })

      }
      else{
        console.log('error');

      }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
