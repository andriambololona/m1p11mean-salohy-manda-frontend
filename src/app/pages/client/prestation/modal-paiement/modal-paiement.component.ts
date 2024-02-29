import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnSameUrlNavigation } from '@angular/router';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { PrestationService } from 'src/app/@core/services/prestation.service';

@Component({
  selector: 'app-modal-paiement',
  templateUrl: './modal-paiement.component.html',
  styleUrls: ['./modal-paiement.component.scss']
})
export class ModalPaiementComponent implements OnInit{
  compte:string;
  data_prestation:any;
  isLoading:boolean=false;
  @Output() emitDataPaiement=new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<ModalPaiementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private prestationService:PrestationService,private messageModalService:MessageModalService
  ) {}

  ngOnInit(): void {
      this.data_prestation=this.data.data_prestation;
      console.log(this.data.data_prestation);
  }

  validerPaiement(id_prestation:string){
    let obj={
      id:id_prestation,
      compte:this.compte
    }
    this.emitDataPaiement.emit(obj);
    this.isLoading=true;
    //this.dialogRef.close();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
