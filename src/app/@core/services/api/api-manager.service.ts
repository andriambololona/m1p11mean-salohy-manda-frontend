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
import { UserService } from '../user.service';
import { ApiResponse } from './api-response';


import { UserRequest } from '../../entity/request/userRequest';
import { ManagerService } from '../manager.service';
import { User } from '../../entity/user';

@Injectable()
export class ApiManagerService extends ManagerService {
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

  getAllPersonnel(showErrorNotif: boolean,page:number,limit:number): Observable<HttpResponse<ApiResponse<any>> | Observable<never>> {
      return this.apiService.get<ApiResponse<any>>(environment.getAllPersonnel_uri+"?page="+page+"&limit="+limit).pipe(
        map((x: HttpResponse<ApiResponse<any>>) => {
          
     
          return this.handleResponse<ApiResponse<any>>(
            showErrorNotif,
            x
          );
        }),
        catchError((error) => {
          return this.catchError(showErrorNotif, error);
        })
      );
  }

  getAllService(showErrorNotif: boolean,page:number,limit:number): Observable<HttpResponse<ApiResponse<any>> | Observable<never>> {
    return this.apiService.get<ApiResponse<any>>(environment.getAllService_uri+"?page="+page+"&limit="+limit).pipe(
      map((x: HttpResponse<ApiResponse<any>>) => {
       
   
        return this.handleResponse<ApiResponse<any>>(
          showErrorNotif,
          x
        );
      }),
      catchError((error) => {
        return this.catchError(showErrorNotif, error);
      })
    );
}

  updateStatusUser(showErrorNotif: boolean, user: UserRequest,status:boolean): Observable<HttpResponse<ApiResponse<any>> | Observable<never>> {

    return this.apiService.put<ApiResponse<any>>(environment.update_status+"?status="+status , user).pipe(

        map((x: HttpResponse<ApiResponse<any>>) => {
            console.log(x);
            
            return this.handleResponse<ApiResponse<any>>(showErrorNotif, x);

        }),

        catchError(error => {

            return this.catchError(showErrorNotif, error);

        })

    );

}
}