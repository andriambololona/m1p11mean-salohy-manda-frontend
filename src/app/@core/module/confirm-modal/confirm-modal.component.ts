import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit{
  constructor(protected dialogRef:  MatDialogRef<ConfirmModalComponent>,@Inject(MAT_DIALOG_DATA) public data) { }
  @Input() title: any;
  @Input() message: any;
  result: Subject<boolean> = new Subject();

  confirm() {
    this.dialogRef.close();
    this.result.next(true);
  }
  onNoClick() {
    this.dialogRef.close();
    this.result.next(false);
  }
  ngOnInit(): void {
    //console.log(this.result.next(true));
  }

}
 