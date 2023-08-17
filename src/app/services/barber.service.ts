import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, concatAll, map, retry, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const API_URL = `${environment.apiURL}/api/barber`;

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  subject = new Subject();
  barbershop$: Observable<User>
  
  constructor(private http: HttpClient) { 
    this.barbershop$ = this.subject.pipe(
      map(email => this.http.get<User>(API_URL + `?email=${email}`)),
      tap(data=> console.log(data)),
      concatAll(),
      retry()
    )
  }

  search(email: string ) {
    this.subject.next(email);
  }

  getDetails(email: string) {
    return this.http.get<User>(API_URL + `?email=${email}`);
  }

  updateBarber(user: User) {
    return this.http.post<User>(API_URL, user); // @TODO implement this method on BE
  }
}
