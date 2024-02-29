import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceRequest } from 'src/app/@core/entity/request/serviceRequest';
import { Service } from 'src/app/@core/entity/service';
import { RegisterComponent } from 'src/app/@core/module/register/register.component';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';

@Component({
  selector: 'app-modal-ajout-service',
  templateUrl: './modal-ajout-service.component.html',
  styleUrls: ['./modal-ajout-service.component.scss']
})
export class ModalAjoutServiceComponent implements OnInit{
  service:Service=new Service();
  serviceReq:ServiceRequest=new ServiceRequest();
  selectedFile?:File;
  isLoading:boolean=false;
  @Output() emitService=new EventEmitter();
  constructor(private messageModalService: MessageModalService,public dialogRef: MatDialogRef<ModalAjoutServiceComponent>,private managerService:ManagerService){

  }
  ngOnInit(): void {

  }

  registerService(){
    this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
      if(confirm){
        this.serviceReq.commission=this.service.commission;
        this.serviceReq.duree=this.service.duree;
        this.serviceReq.nom=this.service.nom;
        this.serviceReq.prix=this.service.prix;

        console.log(this.service)
        this.isLoading=true;
        this.emitService.emit(this.serviceReq);
       }
       else{

       }


    })
  }
  selectFile(event:any){
    this.serviceReq.image=event.target.files[0];
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
