import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, map, of, tap } from 'rxjs';
import { LoginRequest } from '../model/request/auth/loginRequest.interface';
import { SignUpRequest } from '../model/request/auth/signUpRequest.interface';
import { UserDetails } from '../model/request/auth/userDetails.interface';
import { LoginResponse } from '../model/response/auth/loginResponse.interface';
import { DOCUMENT } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly INTERNAL_STORAGE_NAME = "currentUSER"

  private userData: BehaviorSubject<UserDetails | null>;

  constructor(private http: HttpClient, private jwt: JwtHelperService, @Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage
    if (localStorage) {
      let user = localStorage.getItem(AuthService.INTERNAL_STORAGE_NAME);
      if (user !== null) {
        this.userData = new BehaviorSubject<UserDetails | null>(JSON.parse(user));
        return
      }
    }
    this.userData = new BehaviorSubject<UserDetails | null>(null);
  }

  public get userDetails() {
    return this.userData.value
  }

  public get isLogged() {
    return this.userData.value !== null
  }


  login(request: LoginRequest): Observable<UserDetails> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, request)
      .pipe(map((res: LoginResponse) => this.storeSessionInfo(res)))
  }

  signUp(request: SignUpRequest): Observable<UserDetails> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/signup`, request)
      .pipe(map((res: LoginResponse) => this.storeSessionInfo(res)))
  }

  logout(): Observable<any> {
    return of({})
      .pipe(finalize(() => {
        localStorage.removeItem(AuthService.INTERNAL_STORAGE_NAME)
        this.userData.next(null);
      }
      ))
  }

  activateAccount(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/activate`, {}).pipe(tap(() => {
      const newU = this.userData.value
      if (newU !== null) {
        newU.enabled = true
        this.userData.next(newU)
      }
    }))
  }

  private storeSessionInfo(res:LoginResponse): UserDetails {
    const details = this.extractClaims(res)
    localStorage.setItem(AuthService.INTERNAL_STORAGE_NAME, JSON.stringify(details));
    this.userData.next(details);
    return details
  }

  private extractClaims(response: LoginResponse): UserDetails {
    const decoded = this.jwt.decodeToken(response.token)
    return {
      email: decoded['sub'],
      type: decoded['TYPE'],
      enabled: decoded['ENABLED'],
      jwt: response.token
    }
  }
}
