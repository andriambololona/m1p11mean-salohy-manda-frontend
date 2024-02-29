import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ModalUpdateServiceComponent } from '../../services/modal-update-service/modal-update-service.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { UserService } from 'src/app/@core/services/user.service';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { User } from 'src/app/@core/entity/user';

@Component({
  selector: 'app-modal-details-personnel',
  templateUrl: './modal-details-personnel.component.html',
  styleUrls: ['./modal-details-personnel.component.scss']
})
export class ModalDetailsPersonnelComponent implements OnInit {

  data_personnel: any;
  heureDebutTravail: number;
  minuteDebutTravail: number;
  heureFinTravail: number;
  minuteFinTravail: number;
  @Output() emitHoraireTravail=new EventEmitter();

  constructor(private messageModalService: MessageModalService, public dialogRef: MatDialogRef<ModalDetailsPersonnelComponent>,
    private userService: UserService, @Inject(MAT_DIALOG_DATA) public personnel: any) { }

  ngOnInit(): void {
    this.data_personnel = this.personnel.personnel;
    if (this.data_personnel.horaireTravail){
      this.heureDebutTravail = this.data_personnel.horaireTravail.heureDebut;
      this.minuteDebutTravail = this.data_personnel.horaireTravail.minuteDebut;
      this.heureFinTravail = this.data_personnel.horaireTravail.heureFin;
      this.minuteFinTravail = this.data_personnel.horaireTravail.minuteFin;
      // this.heureDebutTravail = (this.data_personnel.horaireTravail.heureDebutTravail) ? this.heureDebutTravail = this.data_personnel.horaireTravail.heureDebutTravail : this.heureDebutTravail = 1;
      // this.minuteDebutTravail = (this.data_personnel.horaireTravail.minuteDebutTravail) ? this.minuteDebutTravail = this.data_personnel.horaireTravail.minuteDebutTravail : this.minuteDebutTravail = 1;
      // this.heureFinTravail = (this.data_personnel.horaireTravail.heureFinTravail) ? this.heureFinTravail = this.data_personnel.horaireTravail.heureFinTravail : this.heureFinTravail = 1;
      // this.minuteFinTravail = (this.data_personnel.horaireTravail.minuteFinTravail) ? this.minuteFinTravail = this.data_personnel.horaireTravail.minuteFinTravail : this.minuteFinTravail = 1;
    } else {
      this.heureDebutTravail = 8;
      this.minuteDebutTravail = 0;
      this.heureFinTravail = 16;
      this.minuteFinTravail = 0;
    }
  }

  modifierHeureTravail(){
    this.emitHoraireTravail.emit({ id: this.data_personnel._id, heureDebutTravail: this.heureDebutTravail, minuteDebutTravail: this.minuteDebutTravail, heureFinTravail: this.heureFinTravail, minuteFinTravail: this.minuteFinTravail })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
