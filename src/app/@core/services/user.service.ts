import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest } from '../entity/request/userRequest';

@Injectable()
export abstract class UserService {
  abstract createUser(showErrorNotif:boolean,user:UserRequest):Observable<HttpResponse<boolean>|Observable<never>>
  abstract login(showErrorNotif:boolean,user:UserRequest):Observable<HttpResponse<boolean>|Observable<never>>
}
