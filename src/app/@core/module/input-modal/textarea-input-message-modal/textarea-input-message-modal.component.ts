import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'textarea-input-message-modal',
  templateUrl: './textarea-input-message-modal.component.html',
  styleUrls: ['./textarea-input-message-modal.component.scss']
})
export class TextareaInputMessageModalComponent implements OnInit {

  message: string;
  title: string;
  placeholder: string;
  result: Subject<string> = new Subject();
  content:string = '';
  f = {};
  constructor() { }

  ngOnInit() {
  }

  save(){
    //this.dialogRef.close();
    this.result.next(this.content);
  }

  cancel(){
    //this.dialogRef.close();
    this.result.next(null);
  }

}
