//import { UserService } from '../@core/services/user.service';
import { Injectable } from '@angular/core';
//import { GetTableDataParam } from '../@core/entity/get-table-data-param';
import { Observable } from 'rxjs';
import { HttpParamsOptions, HttpResponse } from '@angular/common/http';
//import { Datatable } from '../@core/entity/data-table';

import { map, catchError } from 'rxjs/operators';
//import { Picklist } from '../@core/entity/picklist';
//import { ChangeStatusUser } from '../@core/entity/change-status-user';
//import { UserReq } from '../@core/Entity/user-req';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { PrestationService } from '../prestation.service';
import { ApiResponse } from '../../entity/api-response';

@Injectable()
export class ApiPrestationService extends PrestationService {

  constructor(
    private apiService: ApiService,
    //private toastrService: NbToastrService
  ) {
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

  getChiffreAffaireJour(showErrorNotif: boolean, date: Date = new Date()): Observable<Observable<never> | HttpResponse<any>> {
    return this.apiService.get<any>(environment.chiffreAffaireJour_uri + `/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`).pipe(
      map((x:HttpResponse<any>)=>{
        return this.handleResponse<any>(showErrorNotif,x)
      }),
      catchError((error)=>{
        return this.catchError(showErrorNotif,error);
      })
    );
  }

  getChiffreAffaireMois(showErrorNotif: boolean, annee: number, mois: number): Observable<Observable<never> | HttpResponse<any>> {
    return this.apiService.get<any>(environment.chiffreAffaireMois_uri + `/${annee}/${mois}`).pipe(
      map((x:HttpResponse<any>)=>{
        return this.handleResponse<any>(showErrorNotif,x)
      }),
      catchError((error)=>{
        return this.catchError(showErrorNotif,error);
      })
    );
  }

  getBenefice(showErrorNotif: boolean, annee: number, mois: number): Observable<Observable<never> | HttpResponse<any>> {
    return this.apiService.get<any>(environment.benefice_uri + `/${annee}/${mois}`).pipe(
      map((x:HttpResponse<any>)=>{
        return this.handleResponse<any>(showErrorNotif,x)
      }),
      catchError((error)=>{
        return this.catchError(showErrorNotif,error);
      })
    );
  }

  paiement(showErrorNotif: boolean, body: any): Observable<HttpResponse<ApiResponse<any>> | Observable<never>> {
      return this.apiService.post<ApiResponse<any>>(environment.paiement_uri,body).pipe(
        map((x:HttpResponse<ApiResponse<any>>)=>{
          return this.handleResponse<any>(showErrorNotif,x);
      }),
      catchError((error)=>{
        return this.catchError(showErrorNotif,error);
      })
      );
  }

  getAllPrestation(showErrorNotif: boolean, page: number, limit: number, dateDebut?: string, dateFin?: string): Observable<HttpResponse<ApiResponse<any>> | Observable<never>> {
    if(dateDebut!=null && dateFin!=null){
      return this.apiService.get<ApiResponse<any>>(environment.finAllPrestation_uri + `?page=${page}&limit=${limit}&dateDebut=${dateDebut}&dateFin=${dateFin}`).pipe(
        map((x:HttpResponse<ApiResponse<any>>)=>{
          return this.handleResponse<any>(showErrorNotif,x)
        }),
        catchError((error)=>{
          return this.catchError(showErrorNotif,error);
        })
      );
    }
    else{
      return this.apiService.get<ApiResponse<any>>(environment.finAllPrestation_uri + `?page=${page}&limit=${limit}`).pipe(
        map((x:HttpResponse<ApiResponse<any>>)=>{
          return this.handleResponse<any>(showErrorNotif,x)
        }),
        catchError((error)=>{
          return this.catchError(showErrorNotif,error);
        })
      );
    }

  }

  createCompte(showErrorNotif: boolean, body: any): Observable<HttpResponse<ApiResponse<any>> | Observable<never>> {
    return this.apiService.put<ApiResponse<any>>(environment.createCompte_uri,body).pipe(
      map((x:HttpResponse<ApiResponse<any>>)=>{
        return this.handleResponse<any>(showErrorNotif,x)
      }),
      catchError((error)=>{
        return this.catchError(showErrorNotif,error);
      })
    );
  }

}
