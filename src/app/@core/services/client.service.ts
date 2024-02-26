import { Injectable } from '@angular/core';
import { RendezVousRequest } from '../entity/request/rendezVousRequest';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from './api/api-response';
import { UserRequest } from '../entity/request/userRequest';

@Injectable({
  providedIn: 'root'
})
export abstract class ClientService {

  constructor() { }
  abstract getAllPersonnelEmploye(showErrorNotif:boolean,page?:number,limit?:number):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract createRendezVous(showErrorNotif:boolean,rendezVousReq:RendezVousRequest):Observable<HttpResponse<boolean>|Observable<never>>
  abstract addPreference(showErrorNotif:boolean,userReq:any):Observable<HttpResponse<boolean>|Observable<never>>
  //abstract findByIdRendezVous(showErrorNotif:boolean,id:string):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
}
