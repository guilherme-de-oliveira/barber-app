import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, concatAll, debounceTime, map, retry } from 'rxjs';
import { environment } from '../../environments/environment';

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

  search(query: string) {
    this.subject.next(query);
  }
}
