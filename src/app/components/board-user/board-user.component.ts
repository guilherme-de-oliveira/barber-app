import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import {SelectItem} from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  currentUser: User;
  content?: string;
  searchByName: string = '';
  barbershops:any  = [];
  barbershopss$: any;
  sortOrder: number = 1;
  sortField: string = 'username';
  sortOptions: SelectItem[] = [];
  sortKey: SelectItem = {label: 'Price Low to High', value: 'price'};
  userNotFound: boolean = false;
  constructor(
    private token: TokenStorageService,
    private userService: UserService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    this.barbershopss$ = this.userService.barbershops$;
    
    this.userService.barbershops$?.subscribe((data) => {
      this.barbershops = data;
      this.userNotFound = false;

      if (this.barbershops[0].message) {
        this.barbershops = [];
        this.userNotFound = true;
      }
    });

    this.sortOptions = [
      {label: 'Name Asc', value: '!username'},
      {label: 'Name Desc', value: 'username'}
    ];
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }

  isLogged(obj: any) {
    return JSON.stringify(obj) === '{}'
  }

  search(query: any) {
    this.userService.search(query.target.value);
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  Stringfy(obj: any): String | null {
    return JSON.stringify(obj)
  }
}
