import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  isVisibleButtonSignin:boolean=true;
  isVisibleButtonSignup:boolean=true;
  @Output() authUser=new EventEmitter<any>();
  constructor(public dialog: MatDialog,private tokenStorage:TokenStorageService,private route:Router) {}

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
          this.isVisibleButtonSignin=false;
          this.isVisibleButtonSignup=false;
          this.authUser.emit(data);
      },
      error:(err)=> {

      }
    })
  }

  logout(){
    this.tokenStorage.signOut();
    this.isVisibleButtonMenu=false;
    this.isVisibleButtonSignin=true;
    this.isVisibleButtonSignup=true;
    this.authUser.emit();
    this.route.navigateByUrl('/');
  }

}
