import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ApiService } from '../@core/services/api.service';


@Injectable()
export class AuthInterceptor //implements HttpInterceptor
 {
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

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
      return next.handle(req);
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

