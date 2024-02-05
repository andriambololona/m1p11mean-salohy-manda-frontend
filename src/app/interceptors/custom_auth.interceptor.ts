import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NbAuthService, NbAuthToken, NbAuthOAuth2Token, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';
import { TokenStorageService } from '../@core/services/token-storage.service';
import { CustomAuthService } from '../@core/services/custom-auth-service';
import { HubService } from '../@core/services/hub.service';
import { CommentService } from '../@core/services/comment.service';

@Injectable()
export class CustomAuthInterceptor implements HttpInterceptor {
  constructor(
    //private authService: NbAuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private customAuthService: CustomAuthService,
    public commentService:CommentService,
    private hubService:HubService) {

  }
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let { url, method, headers, body } = req;
    //console.log(url);
    if (url.endsWith(environment.generate_token_uri) && method === 'POST') {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      //console.log("interceptor1");
      return next.handle(req);

    }
    if (req.url.endsWith(environment.add_contrat_uri) && method==='POST') {
      //console.log("interceptor3 ");
      //console.log(req.headers.keys);
      //return next.hvbfdsdfggfsandle(req);
     // console.log("new token add");
      //console.log(this.tokenStorage.getToken());


      return this.handleRequest(req, next, this.tokenStorage.getToken());
    }  else {
      //console.log("interceptor4 ");
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
     /* if (!this.tokenStorage.getToken()) {
        console.log("interceptor4.1");
        this.router.navigate(['/auth/login']);
      } else {*/
        //console.log("interceptor4.2");
        //console.log(req);

        return this.handleRequest(req, next, this.tokenStorage.getToken());
      //}
    }


  }
  handleRequest(req: HttpRequest<any>, next: HttpHandler, token: string) {

    const JWT = `Bearer ${token}`
    req = req.clone({
      setHeaders: {
        Authorization: JWT,
      },
    });
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(req, next);
      }
      /*if (error instanceof HttpErrorResponse) {
        return this.handle401Error(req, next);
      }
      else{
        return this.handle401Error(req, next);
      }*/
      return throwError(error);
    }));
  }

  /*private handle401Error(req: HttpRequest<any>, next: HttpHandler) {

    return this.customAuthService.refreshToken().pipe(
      switchMap((data: any) => {
        console.log("refresh token");
        this.tokenStorage.saveToken(data.body.token)
        this.tokenStorage.saveRefreshToken(data.body.refreshToken)
        const JWT = `Bearer ${this.tokenStorage.getToken()}`;
        req = req.clone({
          setHeaders: {
            Authorization: JWT,
          },
        });
        return next.handle(req);
      }),
      catchError((err) => {
        //this.tokenStorage.signOut();
        this.router.navigate(['/auth/login'])
        return throwError(err);
      })
    );

  }*/

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
      return this.customAuthService.refreshToken().pipe(
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
          /*this.hubService.notificationNonLu=[];
          this.hubService.lenNotificationNonLu=0;
          this.commentService.lenCommentaireNonLu=0;
          this.commentService.commentaireNonLu=[];*/
          setTimeout(()=>{
            this.router.navigate(['/auth/login']);
          },0)

          return throwError(err);
        })
      );

    }
  }
}
