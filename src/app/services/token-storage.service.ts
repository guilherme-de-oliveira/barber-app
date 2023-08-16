import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, concatAll, map } from 'rxjs';
import { User } from '../models/user.model';
import { TokenUser } from '../models/token-user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  user$ = new BehaviorSubject<TokenUser>({email: ''});

  constructor() { 
    this.getToken();
    this.getUser();
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

    this.user$.next(user)
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      this.user$.next(JSON.parse(user)) 
    }

    return {};
  }
}
