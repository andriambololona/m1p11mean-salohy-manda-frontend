import { Injectable } from '@angular/core';
import { NotifierService } from '../notifier.service';
import { HttpResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiNotifierService extends NotifierService{

  constructor(
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  catchError(showErrorNotif: boolean, error: any): Observable<never> {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      if (showErrorNotif) {
        //console.log(error.message);
        this.toastrService.danger('Une erreur s\'est produite au niveau du serveur', 'Erreur');
      }
      throw new Error(error);
    }
  }

  handleResponse<T>(showErrorNotif: boolean, response: any): HttpResponse<T> {
    if (showErrorNotif && response.status == 202) {
      this.toastrService.danger(response.body, 'Erreur');
      throw new Error(response.body.toString());
    }
    return response;
  }


  notifier(showErrorNotif:boolean,contratId:string):Observable<HttpResponse<any> | Observable<never>>{
      return this.apiService.get(environment.notifier_uri+"?contratId="+contratId).pipe(
        map((x:HttpResponse<any>)=>{
          return this.handleResponse<boolean>(showErrorNotif,x);
        }),catchError(error=>{
          return this.catchError(showErrorNotif,error);
        })
      );
  }

}
