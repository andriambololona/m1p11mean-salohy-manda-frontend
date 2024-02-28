import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../entity/api-response';
import { UserRequest } from '../entity/request/userRequest';
import { User } from '../entity/user';
import { ServiceRequest } from '../entity/request/serviceRequest';
<<<<<<< HEAD
import { DepenseRequest } from '../entity/request/depenseRequest';
=======
import { PromotionServiceRequest } from '../entity/request/promotionServiceRequest';
>>>>>>> dev-manda

@Injectable()
export abstract class ManagerService {

  abstract getAllPersonnel(showErrorNotif:boolean,page:number,limit:number):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract updateStatusUser(showErrorNotif:boolean,user:UserRequest,status:boolean):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract getAllService(showErrorNotif:boolean,page:number,limit:number):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract createService(showErrorNotif:boolean,serviceReq:FormData):Observable<HttpResponse<boolean>|Observable<never>>
  abstract updateService(showErrorNotif:boolean,serviceReq:ServiceRequest):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract getAllServiceNotPaginate(showErrorNotif:boolean):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
<<<<<<< HEAD
  abstract addDepense(showErrorNotif:boolean,depenseRequest:DepenseRequest):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
  abstract getAllDepense(showErrorNotif:boolean,page:number,limit:number):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
=======
  abstract addPromotion(showErrorNotif:boolean,promotionServiceReq:PromotionServiceRequest):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
>>>>>>> dev-manda
  //abstract deleteService(showErrorNotif:boolean,serviceReq:ServiceRequest):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
}
