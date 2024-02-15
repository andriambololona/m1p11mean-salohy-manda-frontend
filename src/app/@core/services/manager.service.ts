import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../entity/api-response';

@Injectable()
export abstract class ManagerService {

  constructor() { }
  abstract getAllPersonnel(showErrorNotif:boolean,page:number,limit:number):Observable<HttpResponse<ApiResponse<any>>|Observable<never>>
}
