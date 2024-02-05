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
import { GetTableDataParam } from '../../Entity/get-table-data-param';
import { Datatable } from '../../Entity/data-table';
import { User } from '../../data/users';
import { ChangeStatusUser } from '../../Entity/change-status-user';
import { ApiTableDataSource } from './api-table-data-source';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../../Entity/categories';
import { Picklist } from '../../Entity/picklist';
import { ContratService } from '../contrat.service';
import { Contrat } from '../../Entity/contrat';
import { DomSanitizer } from '@angular/platform-browser';
import { Commentaire } from '../../Entity/commentaire';
import { ApiResponse } from '../../Entity/api-response';

@Injectable()
export class ApiContratService extends ContratService {
  constructor(
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }
  catchError(showErrorNotif: boolean, error: any): Observable<never> {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      if (showErrorNotif) {
        //console.log(error.message);
        this.toastrService.danger('Une erreur s\'est produite au niveau du serveur', 'Erreur');
      }
      throw new Error(error);
    }
  }

  handleResponse<T>(showErrorNotif: boolean, response: any): HttpResponse<T> {
    if (showErrorNotif && response.status == 202) {
      this.toastrService.danger(response.body, 'Erreur');
      throw new Error(response.body.toString());
    }
    return response;
  }

  getAllContrat(
    showErrorNotif: boolean,
    getTableDataParam: GetTableDataParam
  ): Observable<
    HttpResponse<ApiResponse<Datatable<Array<Contrat>>>> | Observable<never>
  > {
    return this.apiService
      .post<ApiResponse<Datatable<Array<any>>>>(
        environment.get_contrat_uri,
        getTableDataParam
      )
      .pipe(
        map((x: HttpResponse<ApiResponse<Datatable<Array<Contrat>>>>) => {
          //console.log('All contrats :', x);

          return this.handleResponse<ApiResponse<Datatable<Array<Contrat>>>>(
            showErrorNotif,
            x
          );
        }),
        catchError((error) => {
          return this.catchError(showErrorNotif, error);
        })
      );
  }

  createContrat(
    showErrorNotif: boolean,
    contrat: FormData
  ): Observable<HttpResponse<boolean> | Observable<never>> {
    return this.apiService
      .postMultipart<boolean>(environment.add_contrat_uri, contrat)
      .pipe(
        map((x: HttpResponse<boolean>) => {
          return this.handleResponse<boolean>(showErrorNotif, x);
        }),
        catchError((error) => {
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

  linkDownloadFile(data:any){
    const blob = new Blob([data], { type: 'application/octet-stream' });

    return this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  //downlaod fichier rattache au contrat
  downloadFileContrat(showErrorNotif: boolean,numRefContrat:string,nomFichier:string): Observable<HttpResponse<Blob> | Observable<never>>{
    return this.apiService.downloadGet(environment.upload_contrat_file_uri+"?referenceNumber="+numRefContrat +"&fileName="+nomFichier).pipe(

      map((x: HttpResponse<Blob>) => {
          //console.log(x);
          this.downloadFile(x.body,"application/zip");
          return this.handleResponse<Blob>(showErrorNotif,x);

      }),

      catchError(error => {

          return this.catchError(showErrorNotif, error);

      })
      );
  }
  //link doawnload
  linkFileContrat(showErrorNotif: boolean,numRefContrat:string,nomFichier:string): Observable<HttpResponse<any> | Observable<never>>{
    return this.apiService.downloadGet(environment.upload_contrat_file_uri+"?referenceNumber="+numRefContrat +"&fileName="+nomFichier).pipe(

      map((x: HttpResponse<any>) => {
          //console.log(x);
          let link=this.linkDownloadFile(x.body);
          return this.handleResponse<any>(showErrorNotif,link);

      }),

      catchError(error => {

          return this.catchError(showErrorNotif, error);

      })
      );
  }

  commentContrat(showErrorNotif: boolean, comment: any): Observable<HttpResponse<boolean> | Observable<never>> {
    return this.apiService.post(environment.comment_contrat_uri,comment).pipe(
      map((x: HttpResponse<boolean>) => {
          return this.handleResponse<boolean>(showErrorNotif, x);
      }),
      catchError(error => {
          return this.catchError(showErrorNotif, error);
      })
  );
  }

  getCommentContrat(showErrorNotif:boolean,contrat_id:string):Observable<HttpResponse<ApiResponse<Array<Commentaire>>> | Observable<never>>{
    return this.apiService.get(environment.get_comment_contrat_uri+"?contratId="+contrat_id).pipe(
       map((x: HttpResponse<ApiResponse<Array<Commentaire>>>) => {
      //console.log('commentaire contrat :', x);

      return this.handleResponse<ApiResponse<Array<Commentaire>>>(
        showErrorNotif,
        x
      );
    }),
    catchError((error) => {
      return this.catchError(showErrorNotif, error);
    })
    );
  }

  getHistoriqueContrat(showErrorNotif: boolean, contratId: string): Observable<HttpResponse<ApiResponse<Contrat[]>> | Observable<never>> {
    return this.apiService.get(environment.get_historique_contrat_uri+"?contratId="+contratId).pipe(
      map((x: HttpResponse<ApiResponse<Array<Contrat>>>) => {
     //console.log('historique contrat :', x);

     return this.handleResponse<ApiResponse<Array<Contrat>>>(
       showErrorNotif,
       x
     );
   }),
   catchError((error) => {
     return this.catchError(showErrorNotif, error);
   })
   );
  }


    //exporter excel
  exportExcel(showErrorNotif: boolean, contratId: string,isHistory:boolean): Observable<HttpResponse<Blob> | Observable<never>> {
    return this.apiService.downloadGet(environment.export_excel_contrat+"?contratId="+contratId+"&isHistory="+isHistory).pipe(

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
  exportExcelListeContrat(showErrorNotif: boolean,getTableDataParam:GetTableDataParam): Observable<HttpResponse<Blob> | Observable<never>> {
    return this.apiService.downloadPost(environment.export_excel_liste_contrat,getTableDataParam).pipe(

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
