import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, concatAll, debounceTime, map, retry } from 'rxjs';
import { environment } from '../../environments/environment';

const title = environment.title;
console.log('Environment: ' + title);

const API_URL = `${environment.apiURL}/api/barber`;

@Injectable({
  providedIn: 'root'
})
export class BarberService {

  subject = new BehaviorSubject('');
  barbershop$?: Observable<string[]>
  
  constructor(private http: HttpClient) { 
    this.barbershop$ = this.subject.pipe(
      map(email => this.http.get<any[]>(API_URL + `?email=${email}`)),
      concatAll(),
      retry()
    )
  }
  
  search(email: string) {
    console.log('searcj')
    this.subject.next(email);
  }
}
