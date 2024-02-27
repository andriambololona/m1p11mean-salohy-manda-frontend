import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../entity/api-response';

@Injectable()
export abstract class PrestationService {
  abstract getChiffreAffaireJour(showErrorNotif:boolean, date: Date):Observable<HttpResponse<any>|Observable<never>>;
  abstract getChiffreAffaireMois(showErrorNotif:boolean, annee: number, mois: number):Observable<HttpResponse<any>|Observable<never>>;
  abstract getBenefice(showErrorNotif:boolean, annee: number, mois: number):Observable<HttpResponse<any>|Observable<never>>;
  abstract paiement(showErrorNotif:boolean,body:any):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract getAllPrestation(showErrorNotif:boolean,page:number,limit:number,dateDebut?:string,dateFin?:string):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
}
