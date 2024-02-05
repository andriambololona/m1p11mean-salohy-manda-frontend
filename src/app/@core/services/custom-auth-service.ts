import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../entity/api-response';
import { Datatable } from '../entity/data-table';
import { ApiService } from './api/api.service';
import { TokenStorageService } from './token-storage.service';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';

@Injectable()
export class CustomAuthService  {
    constructor(private apiService: ApiService,
        private _snackBar: MatSnackBar,private tokenStorageService:TokenStorageService  ){
    }

    catchError(showErrorNotif: boolean, error: any): Observable<never>{

        if (error instanceof (Error)) {
            throw new Error(error.message);
        } else {
            //console.log("All cav else :",error);
            if (showErrorNotif) {
                this._snackBar.open('Une erreur s\'est produite au niveau du serveur', "Erreur",{
                    horizontalPosition:'right',
                    verticalPosition:'top'
                });
            }
            throw new Error(error);
        }
    }

    handleResponse<T>(showErrorNotif: boolean, response: any): HttpResponse<T>{
        if (showErrorNotif && response.status == 202) {
            this._snackBar.open(response.body.message, "Erreur",{
                horizontalPosition:'right',
                verticalPosition:'top'
            });
            throw new Error(response.body.toString());
        }
        return response;
    }

    authenticate(usename:string,password:string): Observable<Observable<never>|HttpResponse<any> >{
        return this.apiService.post<any>(environment.generate_token_uri,{UserName:usename,Password:password}).pipe(
            map((x: HttpResponse<any>) => {
            //console.log("All user :",x);
            return this.handleResponse<HttpResponse<any>>(false, x);
        }),
        catchError(error => {
            console.log("error:",error);
            return this.catchError(false, error);
        })
        )
    }

    refreshToken(): Observable<Observable<never> | HttpResponse<any>>{
      //this.hubService.stopConnection();
        return this.apiService.post(environment.generate_token_uri,{Token:this.tokenStorageService.getToken()
            ,RefreshToken:this.tokenStorageService.getRefreshToken()}).pipe(
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
