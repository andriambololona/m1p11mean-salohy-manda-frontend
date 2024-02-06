import { Injectable } from '@angular/core';

import { of as observableOf, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class RoleProvider {
    constructor(

        private router: Router,
        private apiService: ApiService
    ) {
        //super();
    }
    /*getRole(): Observable<string> {
        return this.authService.getToken().pipe(
            map((token: NbAuthToken) => {
                if (token.isValid()) {
                    let payloads = token.getPayload();
                    return token.isValid() ? payloads['role'] : 'USER';
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
