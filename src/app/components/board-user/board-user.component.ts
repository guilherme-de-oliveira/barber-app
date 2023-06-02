import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  currentUser: any;
  content?: string;

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.log(err)
        this.content = err.error;
      }
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  isEmptyObject(obj: any) {
    return JSON.stringify(obj) === '{}'
  }
}
