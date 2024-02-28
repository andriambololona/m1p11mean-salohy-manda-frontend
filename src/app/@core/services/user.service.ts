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
  
}
