import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AuthGuardService //implements CanActivate
 {

  constructor(

    private router: Router,
    private apiService: ApiService
  ) {
  }

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      switchMap((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return of(true);
        } else {
          return this.authService.getToken().pipe(
            switchMap((token: NbAuthToken) => {
              //console.log(token.getPayload())
              if (token != null && token.getPayload() != null) {
                return this.authService.refreshToken(environment.auth_strategy_name, token).pipe(
                  map((result: NbAuthResult) => {
                    if (result.getToken() == null) {
                      this.apiService.get(environment.logout_uri, new HttpParams({ fromString: "username=" + token.getPayload().client_id })).subscribe(x => { });
                      this.router.navigate([environment.login_uri]);
                      return false;
                    } else {
                      return true;
                    }
                  })
                );
              } else {
                this.router.navigate([environment.login_uri]);
                return of(false);
              }
            })
          );
        }
      })
    );
  }*/
}
