import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export abstract class PrestationService {
  abstract getChiffreAffaireJour(showErrorNotif:boolean, date: Date):Observable<HttpResponse<any>|Observable<never>>;
  abstract getChiffreAffaireMois(showErrorNotif:boolean, annee: number, mois: number):Observable<HttpResponse<any>|Observable<never>>;
  abstract getBenefice(showErrorNotif:boolean, annee: number, mois: number):Observable<HttpResponse<any>|Observable<never>>;
}
