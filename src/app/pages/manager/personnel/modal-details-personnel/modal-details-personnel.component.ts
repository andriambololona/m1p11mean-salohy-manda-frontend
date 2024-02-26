import { Component, Inject, OnInit } from '@angular/core';
import { ModalUpdateServiceComponent } from '../../services/modal-update-service/modal-update-service.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';

@Component({
  selector: 'app-modal-details-personnel',
  templateUrl: './modal-details-personnel.component.html',
  styleUrls: ['./modal-details-personnel.component.scss']
})
export class ModalDetailsPersonnelComponent implements OnInit {
  data_personnel:any;
  constructor(private messageModalService: MessageModalService, public dialogRef: MatDialogRef<ModalDetailsPersonnelComponent>,
    private managerService: ManagerService,@Inject(MAT_DIALOG_DATA) public personnel: any){}
  ngOnInit(): void {
    this.data_personnel=this.personnel.personnel;
      console.log(this.data_personnel);
      
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
