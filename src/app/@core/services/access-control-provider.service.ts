import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ApiService } from "./api.service";


@Injectable()
export class AccessControlProviderService {

  constructor(
    //private authService: NbAuthService,
    private router: Router,
    private apiService: ApiService
  ) {}


  /*getAccess(): Observable<any> {

    return this.authService.getToken().pipe(
      map((token: NbAuthToken) => {
        if (token.isValid()) {
          let payloads = token.getPayload();
          return token.isValid() ? payloads : "";
        } else {
          if (token != null && token.getPayload() != null) {
            this.apiService.get(environment.logout_uri, new HttpParams({ fromString: "username=" + token.getPayload().client_id })).subscribe(x => { });
          }
          this.router.navigate([environment.login_uri]);
          return null;
        }
      }),
    );
  }*/


}

