import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  @Output() emitService=new EventEmitter();
  constructor(private messageModalService: MessageModalService,public dialogRef: MatDialogRef<ModalAjoutServiceComponent>,private managerService:ManagerService){

  }
  ngOnInit(): void {

  }
  
  registerService(){
    this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
      if(confirm){
        console.log(this.service);
        this.emitService.emit(this.service);
       }
       else{
       
       }

      
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
