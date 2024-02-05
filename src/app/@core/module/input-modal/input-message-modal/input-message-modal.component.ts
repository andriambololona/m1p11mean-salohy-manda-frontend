import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'input-message-modal',
  templateUrl: './input-message-modal.component.html',
  styleUrls: ['./input-message-modal.component.scss']
})
export class InputMessageModalComponent implements OnInit {
  message: string;
  title: string;
  placeholder: string;
  result: Subject<string> = new Subject();
  content:string = '';
  f = {};
  constructor(protected dialogRef: NbDialogRef<InputMessageModalComponent>) { }

  ngOnInit() {
  }

  save(){
    this.dialogRef.close();
    this.result.next(this.content);
  }

  cancel(){
    this.dialogRef.close();
    this.result.next(null);
  }

}
