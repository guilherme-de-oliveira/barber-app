import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  currentUser: any;
  content?: string;
  searchByName: string = '';
  barbershops: any;

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.barbershops = this.userService.barbershops$?.subscribe((data) => {
      console.log(data)
      this.barbershops = data;
    });

    // this.userService.getPublicContent().subscribe({
    //   next: data => {
    //     this.content = data;
    //     console.log(this.content)
    //   },
    //   error: err => {
    //     console.log(err)
    //     this.content = err.error;
    //   }
    // });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  isEmptyObject(obj: any) {
    return JSON.stringify(obj) === '{}'
  }

  search(query: any) {
    console.log(query)
    this.userService.search(query.target.value);
  }
}
