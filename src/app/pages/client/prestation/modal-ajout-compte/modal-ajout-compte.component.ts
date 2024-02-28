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

  mvola = false;
  orange = false;
  airtel = false;
  montantMvola:number;
  montantAirtel:number;
  montantOrange:number;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  isVisibleMvola:boolean=false;
  isVisibleOrange:boolean=false;
  isVisibleAirtel:boolean=false;
  constructor(private messageModalService:MessageModalService
    ,public dialogRef:MatDialogRef<ModalAjoutCompteComponent>,private _formBuilder: FormBuilder
    ,private prestationService:PrestationService){

  }

  ngOnInit(): void {

  }

  registerCompte(){
    let obj={};
    if(this.mvola && this.orange && this.airtel){
    
      obj={
        "mvola":this.montantMvola,
        "airtel":this.montantAirtel,
        "orange":this.montantOrange
      }
    }
    if(this.mvola && this.orange && !this.airtel){
      obj={
        "mvola":this.montantMvola,
        "orange":this.montantOrange
      }
    }
    if(this.mvola &&this.airtel &&!this.orange){
      obj={
        "mvola":this.montantMvola,
        "airtel":this.montantAirtel,
      }
    }
    if(this.orange &&this.airtel &&!this.mvola){
      obj={
        "orange":this.montantOrange,
        "airtel":this.montantAirtel,
      }
    }
    if(this.orange){
      obj={
        "orange":this.montantOrange,
      }
    }
    if(this.mvola){
      obj={
        "mvola":this.montantMvola,
      }
    }
    if(this.airtel){
      obj={
        "airtel":this.montantAirtel,
      }
    }

    console.log(obj);

    this.messageModalService.confirm("Confirmation","Ete vous").then(confirm=>{
      if(confirm){
        this.prestationService.createCompte(true,obj).subscribe({
          next:(data)=>{
            console.log(data);

          },
          error:(data)=>{
            console.log(data);

          }
        })
      }
      else{

      }
    })

  }

  checkMvola(event:any){
    if(event.checked){
      this.isVisibleMvola=true
    }
    else{
      this.isVisibleMvola=false;
    }

    //this.mvola=true;
  }

  checkOrange(event:any){
    if(event.checked){
      this.isVisibleOrange=true;
    }else{
      this.isVisibleOrange=false;
    }
    //this.orange=true;
  }

  checkAirtel(event:any){
    if(event.checked){
      this.isVisibleAirtel=true;
    }
    else{
      this.isVisibleAirtel=false;
    }

    //this.airtel=true;

  }

  closeDialog(){
    this.dialogRef.close();
  }
}
