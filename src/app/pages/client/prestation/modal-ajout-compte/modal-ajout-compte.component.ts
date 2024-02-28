import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRequest } from 'src/app/@core/entity/request/userRequest';
import { User } from 'src/app/@core/entity/user';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { PrestationService } from 'src/app/@core/services/prestation.service';

@Component({
  selector: 'app-modal-ajout-compte',
  templateUrl: './modal-ajout-compte.component.html',
  styleUrls: ['./modal-ajout-compte.component.scss']
})
export class ModalAjoutCompteComponent implements OnInit{
  user:User=new User();
  userReq:UserRequest=new UserRequest();
  @Output() emitcompteUser=new EventEmitter();

  compte:string;
  montant:number;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  isVisibleMontant:boolean=false;
  constructor(private messageModalService:MessageModalService
    ,public dialogRef:MatDialogRef<ModalAjoutCompteComponent>,private _formBuilder: FormBuilder
    ,private prestationService:PrestationService){

  }

  ngOnInit(): void {

  }

  checkVerif(event:any){
    if(event){
      this.isVisibleMontant=true;
    }
  }
  registerCompte(){
    let obj={
      compte:this.compte,
      montant:this.montant
    }
    this.emitcompteUser.emit(obj);
    /*let obj={
      compte:this.compte,
      montant:this.montant
    }
    */

  }



  closeDialog(){
    this.dialogRef.close();
  }
}
