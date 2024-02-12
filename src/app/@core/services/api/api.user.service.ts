//import { UserService } from '../@core/services/user.service';
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

@Injectable()
export class ApiUserService extends UserService {
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

  createUser(
    showErrorNotif: boolean,
    user: UserRequest
  ): Observable<HttpResponse<any> | Observable<never>> {


    return this.apiService.post<boolean>(environment.register_uri, user).pipe(

      map((x: HttpResponse<boolean>) => {

        return this.handleResponse<boolean>(showErrorNotif, x);
      }),
      catchError((error) => {
        return this.catchError(showErrorNotif, error);
      })
    );
  }

  login(showErrorNotif:boolean,user:UserRequest):Observable<HttpResponse<any>|Observable<never>>{
    return this.apiService.post<any>(environment.login_uri,user).pipe(
      map((x:HttpResponse<any>)=>{
        return this.handleResponse<any>(showErrorNotif,x)
      }),
      catchError((error)=>{
        return this.catchError(showErrorNotif,error);
      })
    );
  }
  /*getAll(showErrorNotif:boolean, getTableDataParam: GetTableDataParam): Observable<HttpResponse<ApiResponse<Datatable<Array<Users>>>> | Observable<never>>{
        return this.apiService.post<ApiResponse<Datatable<Array<Users>>>>(environment.getAllUserUri, getTableDataParam).pipe(
            map((x: HttpResponse<ApiResponse<Datatable<Array<Users>>>>) => {
                //console.log("All user :",x);

                return this.handleResponse<ApiResponse<Datatable<Array<Users>>>>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }

    getAllRole(showErrorNotif:boolean): Observable<HttpResponse<ApiResponse<Array<Roles>>> | Observable<never>>{
        return this.apiService.get<ApiResponse<Array<Roles>>>(environment.getAllUserRolesUri).pipe(
            map((x: HttpResponse<ApiResponse<Array<Roles>>>) => {
                return this.handleResponse<ApiResponse<Array<Roles>>>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }


    updateUser(showErrorNotif: boolean, user: UserReq): Observable<HttpResponse<boolean> | Observable<never>> {

      return this.apiService.post<boolean>(environment.updateUserUri , user).pipe(

          map((x: HttpResponse<boolean>) => {

              return this.handleResponse<boolean>(showErrorNotif, x);

          }),

          catchError(error => {

              return this.catchError(showErrorNotif, error);

          })

      );

  }

    updateStatusUser(showErrorNotif: boolean, userId:string,statut:boolean): Observable<HttpResponse<boolean> | Observable<never>> {

        return this.apiService.get<boolean>(environment.updateStatusUserUri+"?isActive="+statut +"&userId="+userId).pipe(

            map((x: HttpResponse<boolean>) => {

                return this.handleResponse<boolean>(showErrorNotif, x);

            }),

            catchError(error => {

                return this.catchError(showErrorNotif, error);

            })

        );

    }

    //afficher le telechargement dans le navigateur
    downloadFile(data: any,type:string) {
      const blob = new Blob([data], { type: type });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
    }
    //exporter excel
    exportExcel(showErrorNotif: boolean, getTableDataParam: GetTableDataParam): Observable<HttpResponse<Blob> | Observable<never>> {
      return this.apiService.downloadPost(environment.export_excel_uri , getTableDataParam).pipe(

        map((x: HttpResponse<Blob>) => {
            //console.log(x);
            this.downloadFile(x.body,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return this.handleResponse<Blob>(showErrorNotif,x);

        }),

        catchError(error => {

            return this.catchError(showErrorNotif, error);

        })

    );
    }*/
}
