import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnSameUrlNavigation } from '@angular/router';

@Component({
  selector: 'app-modal-paiement',
  templateUrl: './modal-paiement.component.html',
  styleUrls: ['./modal-paiement.component.scss']
})
export class ModalPaiementComponent implements OnInit{
  data_prestation:any;
  constructor(
    public dialogRef: MatDialogRef<ModalPaiementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
      this.data_prestation=this.data.data_prestation;
      console.log(this.data.data_prestation);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
