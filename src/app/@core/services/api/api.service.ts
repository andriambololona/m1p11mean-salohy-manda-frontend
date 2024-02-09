import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ApiService {

  private httpHeaders = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
};
   headerss= new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(() => error.error);
  }

  post<T>(path: string, body: Object = {}): Observable<HttpResponse<T> | Observable<never>> {

    return this.http.post<T>(`${environment.api_host}${path}`, JSON.stringify(body), { observe: 'response'})
      .pipe(catchError(this.formatErrors));
  }

  get<T>(path: string, params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders()): Observable<HttpResponse<T> | Observable<never>> {
    return this.http.get<T>(`${environment.api_host}${path}`, { observe: 'response', params, headers })
      .pipe(catchError(this.formatErrors));
  }

  getImageAsBlob(path: string, params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders()): Observable<HttpResponse<Blob> | Observable<never>> {
    return this.http.get<Blob>(`${environment.api_host}${path}`, { observe: 'response', params, headers, responseType: 'blob' as 'json' })
      .pipe(catchError(this.formatErrors));
  }

  downloadGet(path: string, params: HttpParams = new HttpParams()): Observable<HttpResponse<Blob> | Observable<never>> {
    return this.http.get<Blob>(`${environment.api_host}${path}`, { observe: 'response', responseType: 'arraybuffer' as 'json'})
      .pipe(catchError(this.formatErrors));
  }

  postMultipart<T>(path: string, body: Object = {}, headers: HttpHeaders =new HttpHeaders({ "Content-Type": "multipart/fom-datar" })) {
    //console.log("post multipart " + `${environment.api_host}${path}`);
    return this.http.post<T>(`${environment.api_host}${path}`, body, { observe: 'response'})
      .pipe(catchError(this.formatErrors));
  }
  downloadPost(path: string, body: Object = {}): Observable<HttpResponse<Blob> | Observable<never>> {
    return this.http.post<Blob>(`${environment.api_host}${path}`, JSON.stringify(body), { observe: 'response', responseType:'Blob' as 'json' })
      .pipe(catchError(this.formatErrors));
  }

  downloadBlobOrStringGet(path: string, body: Object = {}): Observable<HttpResponse<any> | Observable<never>> {
    return this.http.get<Blob>(`${environment.api_host}${path}`, { observe: 'response', responseType:'Blob | string' as 'json'  });

  }

}
