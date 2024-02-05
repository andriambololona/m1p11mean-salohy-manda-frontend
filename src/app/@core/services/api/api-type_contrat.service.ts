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
import { CategorieService } from '../categorie.service';
import { Categorie } from '../../Entity/categories';
import { Picklist } from '../../Entity/picklist';
import { TypesContrat } from '../../Entity/type_contrats';
import { TypeContratService } from '../type_contrat.service';

@Injectable()
export class ApiTypeContratService extends TypeContratService{



    constructor(private apiService: ApiService, private toastrService: NbToastrService){
        super();
    }
    catchError(showErrorNotif: boolean, error: any): Observable<never>{

        if (error instanceof (Error)) {
            throw new Error(error.message);
        } else {
            if (showErrorNotif) {
                this.toastrService.danger('Une erreur s\'est produite au niveau du serveur', "Erreur");
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

    getAllTypeContrat(showErrorNotif:boolean, getTableDataParam: GetTableDataParam): Observable<HttpResponse<ApiResponse<Datatable<Array<TypesContrat>>>> | Observable<never>>{
        return this.apiService.post<ApiResponse<Datatable<Array<TypesContrat>>>>(environment.getAllPicklistUri, getTableDataParam).pipe(
            map((x: HttpResponse<ApiResponse<Datatable<Array<TypesContrat>>>>) => {
                //console.log("All user :",x);

                return this.handleResponse<ApiResponse<Datatable<Array<TypesContrat>>>>(showErrorNotif, x);
            }),
            catchError(error => {
                return this.catchError(showErrorNotif, error);
            })
        );
    }

    createTypeContrat(showErrorNotif:boolean, picklist:Picklist): Observable<HttpResponse<any> | Observable<never>>{
      return this.apiService.post<boolean>(environment.createCategoriePicklistUri,picklist ).pipe(
          map((x: HttpResponse<boolean>) => {
              return this.handleResponse<boolean>(showErrorNotif, x);
          }),
          catchError(error => {
              return this.catchError(showErrorNotif, error);
          })
      );
  }
}
