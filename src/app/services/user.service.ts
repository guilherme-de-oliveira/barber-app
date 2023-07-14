import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, concatAll, debounceTime, map, retry } from 'rxjs';
import { environment } from '../../environments/environment';

const title = environment.title;
console.log('Environment: ' + title);

const API_URL = `${environment.apiURL}/api/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  subject = new Subject();
  barbershops$?: Observable<string[]>
  
  constructor(private http: HttpClient) { 
    this.barbershops$ = this.subject.pipe(
      debounceTime(500),
      map(searchText => this.http.get<any[]>(API_URL + `?barber=${searchText}`)),
      concatAll(),
      retry()
    )
  }

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }

  search(query: string) {
    console.log('searcj')
    this.subject.next(query);
  }

  // getUserInfo(email: string | undefined) {
  //   return this.http.get<any[]>(API_URL + `/details?barber=${email}`)
  // }
}
