import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-barber-form',
  templateUrl: './barber-form.component.html',
  styleUrls: ['./barber-form.component.scss']
})

export class BarberFormComponent implements OnInit{
  formType: string = 'login';
  loginType: string = 'barber';
  form: FormGroup = new FormGroup({
    barbershop: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';

  // Login
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  user$: BehaviorSubject<User>;
  user: User;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private router: Router) { 
      this.tokenStorage.user$.subscribe(data => this.user = data)
    }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['barbershop']);
    }

    this.setFormRules();
  }

  // @TODO - move to a shared
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  // @TODO - move to a shared
  setFormRules() {
    // Set up form rules
    this.form = this.formBuilder.group(
      {
        barbershop: ['', {
          validators: [
            Validators.required
          ],
          updateOn: 'blur'
        }],
        email: ['', {
          validators: [
            Validators.required,
            Validators.email
          ],
          updateOn: 'blur'
        }],
        phoneNumber: ['', {
          validators: [
            Validators.required,
            Validators.pattern('[- +()0-9]{6,}')
          ],
          updateOn: 'blur'
        }],
        password: ['', {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(40)
          ],
          updateOn: 'change' //used when automitac fill by browser
        }]
      }
    );
  }

  onSubmit(): void {
    const barbershop = this.form.value['barbershop'];
    const email = this.form.value['email'];
    const phoneNumber = this.form.value['phoneNumber'];
    const password = this.form.value['password'];

    (this.formType == 'login') ? this.login(email, password) : this.signUp(barbershop, email, phoneNumber, password);
  }

  login(email: string, password: string) {
    this.authService.login(this.loginType, email, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.user$.next(data)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        this.router.navigate(['barbershop']);
        // this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  signUp(username: string, email: string, phoneNumber: string, password: string) {
    this.submitted = true;

    this.authService.register(this.loginType, username, email, phoneNumber, password).subscribe({
      next: data => {
        this.successMessage = data.message;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
