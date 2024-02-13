import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthComponent } from 'src/app/@core/module/auth/auth.component';
import { RegisterComponent } from 'src/app/@core/module/register/register.component';
import { TokenStorageService } from 'src/app/@core/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  showFiller = false;
  isVisibleButtonMenu:boolean=false;
  @Output() authUser=new EventEmitter<any>();
  constructor(public dialog: MatDialog,private tokenStorage:TokenStorageService) {}

  ngOnInit(): void {
    if(this.tokenStorage.geId()){
      this.isVisibleButtonMenu=true;
    }
  }

  openDialogInscription(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {

      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  openDialogConnexion(): Observable<string> {
    const dialogRef = this.dialog.open(AuthComponent, {
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
    return  new Observable((observer)=>{
      dialogRef.componentInstance.authUser.subscribe((result)=>{
        observer.next(result);
      })
    })
  }

  signin(){
    this.openDialogConnexion().subscribe({
      next:(data:string)=>{
          this.isVisibleButtonMenu=true;
          this.authUser.emit(data);
      },
      error:(err)=> {

      }
    })
  }

  logout(){
    this.tokenStorage.signOut();
    this.isVisibleButtonMenu=false;
    this.authUser.emit(null);
  }

}
