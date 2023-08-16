import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit{
  formType: string = 'login';
  loginType: string = 'client';
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(null)
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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private router: Router) { }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['user'])
    }

    // Set up form rules
    this.form = this.formBuilder.group(
      {
        clientName: ['', {
          validators: [
            Validators.required,
            Validators.minLength(3)
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
          updateOn: 'change'
        }]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    // console.log(this.form.controls)
    return this.form.controls;
  }
  
  onSubmit(): void {
    console.log(JSON.stringify(this.form.value, null, 2));
    const clientName = this.form.value['clientName'];
    const phoneNumber = this.form.value['phoneNumber'];
    const email = this.form.value['email'];
    const password = this.form.value['password'];
    
    (this.formType == 'login') ? this.login(email, password) : this.signUp(clientName, email, phoneNumber, password);
  }

  // formatData():Array<string> {
  //   if (this.form.invalid) {
  //     console.error('No values found.')
  //     return [];
  //   }

  //   const username = this.form.value['username'];
  //   const email = this.form.value['email'];
  //   const password = this.form.value['password'];
    
  //   return (this.formType == 'login') ? [username, password] : [username, email, password]
  // }

  login(email: string, password: string) {
    console.log('login ', password)

    this.authService.login(this.loginType, email, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        
        console.log(data)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        this.router.navigate(['user']);
        this.reloadPage();
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  signUp(clientName: string, email: string, phoneNumber: string, password: string) {
    console.log('sign up');
    this.submitted = true;

    this.authService.register(this.loginType, clientName, email, phoneNumber, password).subscribe({
      next: data => {
        console.log(data);
        this.successMessage = data.message;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
