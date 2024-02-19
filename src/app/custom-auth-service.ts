import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { ApiService } from './@core/services/api.service';
import { TokenStorageService } from './@core/services/token-storage.service';


@Injectable()
export class CustomAuthService  {
    constructor(private apiService:ApiService,private tokenStorageService:TokenStorageService  ){
    }

    catchError(showErrorNotif: boolean, error: any): Observable<never>{

        if (error instanceof (Error)) {
            throw new Error(error.message);
        } else {
            //console.log("All cav else :",error);
            if (showErrorNotif) {
                /*this._snackBar.open('Une erreur s\'est produite au niveau du serveur', "Erreur",{
                    horizontalPosition:'right',
                    verticalPosition:'top'
                });*/console.log(showErrorNotif);

            }
            throw new Error(error);
        }
    }

    handleResponse<T>(showErrorNotif: boolean, response: any): HttpResponse<T>{
        if (showErrorNotif && response.status == 202) {
            /*this._snackBar.open(response.body.message, "Erreur",{
                horizontalPosition:'right',
                verticalPosition:'top'
            });*/
            throw new Error(response.body.toString());
        }
        return response;
    }



    refreshToken(): Observable<Observable<never> | HttpResponse<any>>{
      //this.hubService.stopConnection();
      let body={};
        return this.apiService.post(environment.refresh_token_uri,body).pipe(
            map((x: HttpResponse<any>) => {
            console.log("refresh token");
            return this.handleResponse<HttpResponse<any>>(false, x);
        }),
        catchError(error => {
            console.log("error:",error);
            return this.catchError(false, error);
        })
        )
    }

    logOut(){
        //this.hubService.stopConnection();
        this.tokenStorageService.signOut()
    }
}
