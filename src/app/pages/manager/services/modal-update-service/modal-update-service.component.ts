import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from 'src/app/@core/entity/service';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { ModalAjoutServiceComponent } from '../modal-ajout-service/modal-ajout-service.component';

@Component({
  selector: 'app-modal-update-service',
  templateUrl: './modal-update-service.component.html',
  styleUrls: ['./modal-update-service.component.scss']
})
export class ModalUpdateServiceComponent implements OnInit {
  service: Service = new Service();
  isLoading:boolean=false;
  @Output() emitService = new EventEmitter();
  constructor(private messageModalService: MessageModalService, public dialogRef: MatDialogRef<ModalUpdateServiceComponent>,
     private managerService: ManagerService,@Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.service=this.data.service;
  }

  updateService() {
    this.messageModalService.confirm("Confirmation", "Etes-vous sûr de vouloir continuer ?").then(confirm => {
      if (confirm) {
        //console.log(this.service);
        this.isLoading=true;
        this.emitService.emit(this.service);
      }
      else {

      }


    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
