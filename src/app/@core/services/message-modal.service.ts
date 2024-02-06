import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../module/confirm-modal/confirm-modal.component';
@Injectable(
  {providedIn:'root'}
)
export class MessageModalService{
    constructor(private dialogService: MatDialog){}

    confirm(title: string, message: string): Promise<boolean>{
        const modalRef = this.dialogService.open(
          ConfirmModalComponent,
            {
              data: {title: title, message:message},
             
            });
          return new Promise<boolean>((resolve, reject) => modalRef.componentInstance.result.subscribe(
            result => resolve(result)
          ));
    }

}
