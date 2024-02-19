import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { TokenStorageService } from '../@core/services/token-storage.service';

import { RefreshTokenRequest } from '../@core/entity/request/refreshTokenRequest';
import { User } from '../@core/entity/user';
import { UserService } from '../@core/services/user.service';
import { ManagerService } from '../@core/services/manager.service';
import { CustomAuthService } from '../@core/services/custom-auth-service';
import { ApiService } from '../@core/services/api/api.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor
 {
  private isRefreshing:boolean=false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private router: Router,
    private apiService: ApiService,
    private tokenStorage:TokenStorageService,
    private customAuthService:CustomAuthService,
    //private managerService:ManagerService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let { url, method, headers, body } = req;
    //return this.handleRequest(req, next, null);
     if (url.endsWith(environment.register_uri) && method === 'POST') {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        //body: body += '&client_id=' + environment.client_id
      });
      console.log("interceptor ");
      return next.handle(req);
    }
    if (url.endsWith(environment.login_uri) && method === 'POST') {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        //body: body += '&client_id=' + environment.client_id
      });
      console.log("interceptor ");
      return next.handle(req);
    }
    if (req.url.endsWith(environment.generate_token_uri) && method==='POST') {
     // console.log("interceptor3 ");
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        //body: body += '&client_id=' + environment.client_id
      });
      console.log(req.headers);

      return next.handle(req);
    } else {
      console.log("interceptor2")
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      return this.handleRequest(req,next,this.tokenStorage.getToken());
    }

  }
  handleRequest(req: HttpRequest<any>, next: HttpHandler, token: string) {

    //const JWT = `x-access-token${token}`
    req = req.clone({
      setHeaders: {
        'x-access-token': token,
      },
    });
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(req, next);
      }

      return throwError(error);
    }));
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    console.log("401");
    console.log(this.isRefreshing);

    if(this.isRefreshing){
      return this.refreshTokenSubject.pipe(
        filter((refreshed) => refreshed),
        take(1),
        switchMap((x: any) => {
          console.log("switchMap: "+x);

          return this.handleRequest(req, next, this.tokenStorage.getToken());
        })
      )

    }else{
      this.isRefreshing=true;
      let refreshToken:RefreshTokenRequest=new RefreshTokenRequest();
      refreshToken.token=this.tokenStorage.getToken();
      
      return this.customAuthService.refreshToken(refreshToken).pipe(
        switchMap((data: any) => {
          console.log("switchMap2: ");
          console.log(data);


          this.tokenStorage.saveToken(data.body.token)
          this.tokenStorage.saveRefreshToken(data.body.refreshToken)
          const JWT = `Bearer ${this.tokenStorage.getToken()}`;
          req = req.clone({
            setHeaders: {
              Authorization: JWT,
            },
          });
          this.isRefreshing=false;
          this.refreshTokenSubject.next(true)
          //this.hubService.startConnection();
          return next.handle(req);
        }),
        catchError((err) => {
          this.isRefreshing=false;
          this.refreshTokenSubject.next(false)

          this.tokenStorage.signOut();
          //this.hubService.stopConnection();
          //window.location.reload();

          setTimeout(()=>{
            this.router.navigate(['/auth/login']);
          },0)

          return throwError(err);
        })
      );

    }
  }
  /*handleRequest(req: HttpRequest<any>, next: HttpHandler, token: NbAuthOAuth2Token) {
     const JWT = `Bearer ${token.getValue()}`;
    req = req.clone({
      setHeaders: {
        Authorization: JWT,
      },
    });
    return next.handle(req);
  }*/

    /*let { url, method, headers, body } = req;
    if (url.endsWith(environment.logout_uri) && method === 'GET') {
      return next.handle(req);
    }
    else if (url.endsWith(environment.generate_token_uri) && method === 'POST') {
      if (req.body.includes("grant_type=password")) {
        req = req.clone({

          body: body += '&client_id=' + environment.client_id
        });
        return next.handle(req);
      } else if (req.body.includes("grant_type=refresh_token")) {
        return this.authService.getToken().pipe(
          switchMap((token: NbAuthToken) => {
            req = req.clone({
              body: body += '&client_id=' + token.getPayload().client_id
            });
            return next.handle(req);
          })
        );
      }
      return next.handle(req);
    } else {
      return this.authService.getToken().pipe(
        switchMap((token: NbAuthToken) => {
          if (token.isValid()) {
            return this.handleRequest(req, next, token);
          } else {
            return this.authService.refreshToken(environment.auth_strategy_name, token).pipe(
              switchMap((result: NbAuthResult) => {
                if (result.getToken() != null) {
                  return this.authService.getToken().pipe(
                    switchMap((token: NbAuthToken) => {
                      return this.handleRequest(req, next, token);
                    })
                  );
                } else {
                  if (token != null && token.getPayload() != null) {
                    this.apiService.get(environment.logout_uri, new HttpParams({ fromString: "username=" + token.getPayload().client_id })).subscribe(x => { });
                  }
                  this.router.navigate([environment.login_uri + "?token=test"]);
                  return this.handleRequest(req, next, token);
                }
              })
            );
          }
        }));
    }*/

 }
