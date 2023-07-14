import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, concatAll, debounceTime, map, retry, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const title = environment.title;
console.log('Environment: ' + title);

const API_URL = `${environment.apiURL}/api/barber`;

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  subject = new Subject();
  barbershop$: Observable<User>
  
  constructor(private http: HttpClient) { 
    this.barbershop$ = this.subject.pipe(
      tap(data=> console.log(data)),
      map(email => this.http.get<User>(API_URL + `?email=${email}`)),
      tap(data=> console.log(data)),
      concatAll(),
      retry()
    )
  }

  search(email: string ) {
    console.log('searcj: ', API_URL)
    this.subject.next(email);
  }
}
