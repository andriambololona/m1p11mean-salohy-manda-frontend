import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable()
export class TestService {

  constructor(private apiService: ApiService) { }

  getClaim(): Observable<any> {
      return this.apiService.get("/api/values?id=user")
  }
}
