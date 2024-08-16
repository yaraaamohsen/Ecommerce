import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../base/environment';
import { loginData, RegisterData } from './../models/register-data';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userDecode: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router, @Inject(PLATFORM_ID) private _browserID: object) {
    if (isPlatformBrowser(_browserID)) {
      if (localStorage.getItem('userToken') != null) {
        this.userData();
        this._Router.navigate([localStorage.getItem('currentPage')]);
      }
    }
  }

  register(data: RegisterData): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup`, data)
  }

  login(data: loginData): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin`, data)
  }

  userData() {
    this.userDecode.next(jwtDecode(JSON.stringify(localStorage.getItem('userToken'))));
  }

  sendEmailVerify(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, data)
  }  
  
  sendCode(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, data)
  }

  sendNewPassword(data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`, data)
  }
  
}
