import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Depense } from 'src/app/@core/entity/depense';
import { DepenseRequest } from 'src/app/@core/entity/request/depenseRequest';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';

@Component({
  selector: 'app-modal-ajout-depense',
  templateUrl: './modal-ajout-depense.component.html',
  styleUrls: ['./modal-ajout-depense.component.scss']
})
export class ModalAjoutDepenseComponent implements OnInit {
  depense:Depense=new Depense();
  depenseReq:DepenseRequest=new DepenseRequest();
  isLoading:boolean=false;
  @Output() emitDepense=new EventEmitter();
  constructor(private messageModalService:MessageModalService,public dialogRef:MatDialogRef<ModalAjoutDepenseComponent>){

  }

  ngOnInit(): void {

  }

  registerDepense(){
    this.depenseReq.montant=this.depense.montant;
    this.depenseReq.motif=this.depense.motif;
    this.isLoading=true;
    this.emitDepense.emit(this.depenseReq);
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
