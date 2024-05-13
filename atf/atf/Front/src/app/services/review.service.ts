import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RateRequest } from '../model/request/rate/rateRequest.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  review(request: RateRequest): Observable<any>{
    return this.http.post(`${environment.apiUrl}/rating/create`, request)
  }
}
