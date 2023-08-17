import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.apiURL;
const AUTH_API = `${API_URL}/api/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(loginType: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      loginType,
      email,
      password
    }, httpOptions);
  }

  register(roles: string, username: string, email: string, phoneNumber: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      roles,
      username,
      email,
      phoneNumber,
      password
    }, httpOptions);
  }
}
