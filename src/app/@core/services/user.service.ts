import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest } from '../entity/request/userRequest';
import { ApiResponse } from './api/api-response';
import { RendezVousRequest } from '../entity/request/rendezVousRequest';

@Injectable()
export abstract class UserService {
  abstract createUser(showErrorNotif:boolean,user:FormData):Observable<HttpResponse<boolean>|Observable<never>>
  abstract login(showErrorNotif:boolean,user:UserRequest):Observable<HttpResponse<boolean>|Observable<never>>
  abstract createRendezVous(showErrorNotif:boolean,rendezVousReq:RendezVousRequest):Observable<HttpResponse<boolean>|Observable<never>>
  abstract getTempsTravailMoyen(showErrorNotif: boolean):Observable<HttpResponse<any>|Observable<never>>
  abstract getProfil(showErrorNotif: boolean):Observable<HttpResponse<any>|Observable<never>>
  abstract setHoraireTravail(showErrorNotif: boolean, id: string, heureDebut: number, minuteDebut: number, heureFin: number, minuteFin: number):Observable<HttpResponse<any>|Observable<never>>
}
