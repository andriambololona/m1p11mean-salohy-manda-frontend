import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ClientService } from '../client.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { RendezVousRequest } from '../../entity/request/rendezVousRequest';
import { ApiResponse } from '../../entity/api-response';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ApiClientService extends ClientService{

  constructor(private apiService:ApiService) {
    super();
  }
  catchError(showErrorNotif: boolean, error: any): Observable<never> {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      if (showErrorNotif) {
       // this.toastrService.danger(error, 'Erreur');
      }
      throw new Error(error);
    }
  }

  handleResponse<T>(showErrorNotif: boolean, response: any): HttpResponse<T> {
    if (showErrorNotif && response.status == 202) {
      //this.toastrService.danger(response.body, 'Erreur');
      throw new Error(response.body.toString());
    }
    return response;
  }

  getAllPersonnelEmploye(showErrorNotif: boolean,page:number,limit:number):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>{
    return this.apiService.get<ApiResponse<any>>(environment.getAllersonnelEmploye_uri+"?page="+page+"&limit="+limit).pipe(

      map((x: HttpResponse<ApiResponse<any>>) => {

        return this.handleResponse<ApiResponse<any>>(showErrorNotif, x);
      }),
      catchError((error) => {
        return this.catchError(showErrorNotif, error);
      })
      );
    }
  createRendezVous(
    showErrorNotif: boolean,
    rendezvous: RendezVousRequest
  ): Observable<HttpResponse<any> | Observable<never>> {


    return this.apiService.post<boolean>(environment.create_rendezVous_uri, rendezvous).pipe(

      map((x: HttpResponse<boolean>) => {

        return this.handleResponse<boolean>(showErrorNotif, x);
      }),
      catchError((error) => {
        return this.catchError(showErrorNotif, error);
      })
    );
  }
}
