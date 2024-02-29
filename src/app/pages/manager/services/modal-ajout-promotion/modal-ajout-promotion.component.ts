import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/@core/entity/service';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { PromotionServiceRequest } from 'src/app/@core/entity/request/promotionServiceRequest';

@Component({
  selector: 'app-modal-ajout-promotion',
  templateUrl: './modal-ajout-promotion.component.html',
  styleUrls: ['./modal-ajout-promotion.component.scss']
})
export class ModalAjoutPromotionComponent implements OnInit {
  service: Service=new Service();
  isLoading:boolean=false;
  promotionServiceRequest: PromotionServiceRequest=new PromotionServiceRequest();
  selectedFile?:File;

  @Output() emitService=new EventEmitter();
  constructor(private messageModalService: MessageModalService,public dialogRef: MatDialogRef<ModalAjoutPromotionComponent>,private managerService:ManagerService, @Inject(MAT_DIALOG_DATA) public data: any){

  }

  ngOnInit(): void {
    this.service=this.data.service;
    this.promotionServiceRequest.description = "Promotion début d'année";
    this.promotionServiceRequest.pourcentageReduction = 10;
  }

  addPromotion(){
    this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir enregistrer cette promotion ?").then(confirm=>{
      if(confirm){
        this.promotionServiceRequest.id = this.service._id;
        this.isLoading=true;
        this.emitService.emit(this.promotionServiceRequest);
       }
       else{

       }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
