import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detail-service',
  templateUrl: './modal-detail-service.component.html',
  styleUrls: ['./modal-detail-service.component.scss']
})
export class ModalDetailServiceComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<ModalDetailServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    
  }

  ngOnInit(): void {
      console.log(this.data.id);
      console.log(this.data.nom);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
