import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-description-service',
  templateUrl: './modal-description-service.component.html',
  styleUrls: ['./modal-description-service.component.scss']
})
export class ModalDescriptionServiceComponent implements OnInit{
  data_service:any;
  constructor(
    public dialogRef: MatDialogRef<ModalDescriptionServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
      this.data_service=this.data.data_service;
      console.log(this.data.data_service);
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
