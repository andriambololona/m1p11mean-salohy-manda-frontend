import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBarSuccess(message: string, action: string="success") {
    this._snackBar.open(message, action,{duration:5000,horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition});
  }
  openSnackBarError(message: string, action: string="erreur") {
    this._snackBar.open(message, action,{duration:5000,horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition});
  }
  openSnackBarErrorServer(message: string=" Veuillez contacter les responsables.", action: string="erreur") {
    this._snackBar.open(message, action,{duration:5000,horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition});
  }
}
