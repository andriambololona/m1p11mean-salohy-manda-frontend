//import { UserService } from '../@core/services/user.service';
import { Injectable } from '@angular/core';
//import { GetTableDataParam } from '../@core/entity/get-table-data-param';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
//import { Datatable } from '../@core/entity/data-table';

import { NbToastrService } from '@nebular/theme';
import { map, catchError } from 'rxjs/operators';
//import { Picklist } from '../@core/entity/picklist';
//import { ChangeStatusUser } from '../@core/entity/change-status-user';
//import { UserReq } from '../@core/Entity/user-req';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Users } from '../../Entity/users';
import { UserService } from '../user.service';
import { UserReq } from '../../Entity/user-req';
import { Roles } from '../../Entity/Roles';
import { ApiResponse } from './api-response';
import { GetTableDataParam } from '../../Entity/get-table-data-param';
import { Datatable } from '../../Entity/data-table';
import { User } from '../../data/users';
import { ChangeStatusUser } from '../../Entity/change-status-user';
import { ApiTableDataSource } from './api-table-data-source';

@Injectable()
export class ApiUserService extends UserService{



    constructor(private apiService: ApiService, private toastrService: NbToastrService){
        super();
    }
    catchError(showErrorNotif: boolean, error: any): Observable<never>{

        if (error instanceof (Error)) {
            throw new Error(error.message);
        } else {
            if (showErrorNotif) {
                this.toastrService.danger(error, "Erreur");
            }
            throw new Error(error);
        }
    }

    handleResponse<T>(showErrorNotif: boolean, response: any): HttpResponse<T>{
        if (showErrorNotif && response.status == 202) {
            this.toastrService.danger(response.body, "Erreur");
            throw new Error(response.body.toString());
        }
        return response;
    }

    getAll(showErrorNotif:boolean, getTableDataParam: GetTableDataParam): Observable<HttpResponse<ApiResponse<Datatable<Array<Users>>>> | Observable<never>>{
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
    createUser(showErrorNotif:boolean, user:UserReq): Observable<HttpResponse<any> | Observable<never>>{
        return this.apiService.post<boolean>(environment.createUserUri,user ).pipe(
            map((x: HttpResponse<boolean>) => {
                return this.handleResponse<boolean>(showErrorNotif, x);
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
    }


}
