import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../entity/api-response';
import { UserRequest } from '../entity/request/userRequest';
import { User } from '../entity/user';
import { ServiceRequest } from '../entity/request/serviceRequest';

@Injectable()
export abstract class ManagerService {

  abstract getAllPersonnel(showErrorNotif:boolean,page:number,limit:number):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract updateStatusUser(showErrorNotif:boolean,user:UserRequest,status:boolean):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract getAllService(showErrorNotif:boolean,page:number,limit:number):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract createService(showErrorNotif:boolean,serviceReq:ServiceRequest):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
}
