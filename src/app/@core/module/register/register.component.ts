import { Component, OnInit } from '@angular/core';
import { MessageModalService } from '../../services/message-modal.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private messageModalService: MessageModalService,public dialogRef: MatDialogRef<RegisterComponent>){
    
  }
  ngOnInit(): void {
      
  }
  register(){
    this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
      if(confirm){
        console.log('success');
        this.dialogRef.close();
      }
      else{
        console.log('error');
        
      }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
