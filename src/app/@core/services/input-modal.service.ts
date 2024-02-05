import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InputMessageModalComponent } from '../module/input-modal/input-message-modal/input-message-modal.component';
import { TextareaInputMessageModalComponent } from '../module/input-modal/textarea-input-message-modal/textarea-input-message-modal.component';

@Injectable()
export class InputModalService {
  constructor(private dialogService: MatDialog) { }
  inputMessage(title: string, message: string, defaultContent?: string, placeholder?: string): Promise<string> {
    const modalRef = this.dialogService.open(
      InputMessageModalComponent,
        {
          data: { title: title, message: message, content: defaultContent, placeholder: placeholder },
        });
    return new Promise<string>((resolve, reject) => modalRef.componentInstance.result.subscribe(
      result => resolve(result)
    ));
    
  }

    textareaInputMessage(title: string, message: string, defaultContent?: string, placeholder?: string): Promise<string> {
      const modalRef = this.dialogService.open(
        TextareaInputMessageModalComponent,
        {
          data: { title: title, message: message, content: defaultContent, placeholder: placeholder },
         
        });
      return new Promise<string>((resolve, reject) => modalRef.componentInstance.result.subscribe(
        result => resolve(result)
      ));
    }
}
