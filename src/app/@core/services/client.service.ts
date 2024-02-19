import { Injectable } from '@angular/core';
import { RendezVousRequest } from '../entity/request/rendezVousRequest';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from './api/api-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ClientService {

  constructor() { }
  //abstract createRendezVous(showErrorNotif:boolean,rendezVousReq:RendezVousRequest):Observable<HttpResponse<boolean>|Observable<never>>
  //abstract findByIdRendezVous(showErrorNotif:boolean,id:string):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
}
