import { Injectable } from '@angular/core';
import { Rendezvous } from '../entity/rendezvous';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVousRequest } from '../entity/request/rendezVousRequest';
import { ApiResponse } from './api/api-response';

@Injectable()
export abstract class RendezvousService {
  abstract get(showErrorNotif : boolean, page : number, limit : number) : Observable<HttpResponse<boolean>|Observable<never>>;
 
}
