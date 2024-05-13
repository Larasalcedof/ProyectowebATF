import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RentSolicitudeRequest } from '../model/request/solicitude/rentSolicitudeRequest.interface';
import { AuthService } from './auth.service';
import { RentSolicitudeSetStatusRequest } from '../model/request/solicitude/rentSolicitudeSetStatusRequest.interface';
import { RentSolicitudePayRequest } from '../model/request/solicitude/rentSolicitudePayRequest.interface';
import { RentSolicitudeResponse } from '../model/response/solicitude/solicitudeResponse.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  rent(request: RentSolicitudeRequest): Observable<any>{
    return this.http.post(`${environment.apiUrl}/solicitude/create`, request)
  }

  getRentRequests(): Observable<RentSolicitudeResponse[]>{
    const type = this.auth.userDetails?.type
    const path = type === "LANDLORD" ? 'landlord': 'user'
    return this.http.get<RentSolicitudeResponse[]>(`${environment.apiUrl}/solicitude/${path}`)
  }

  setRentStatus(request: RentSolicitudeSetStatusRequest): Observable<any>{
    return this.http.post(`${environment.apiUrl}/solicitude/set`, request)
  }

  pay(request: RentSolicitudePayRequest): Observable<any>{
    return this.http.post(`${environment.apiUrl}/solicitude/pay`, request)
  }
}
