import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formType: string = 'login';

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
      this.router.navigate(['profile'])
    }

    // Set up form rules
    this.form = this.formBuilder.group(
      {
        username: ['', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
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
        password: ['', {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(40)
          ],
          updateOn: 'blur'
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
    const username = this.form.value['username'];
    const email = this.form.value['email'];
    const password = this.form.value['password'];

    (this.formType == 'login') ? this.login(username, password) : this.signUp(username, email, password);
  }

  formatData():Array<string> {
    if (this.form.invalid) {
      console.error('No values found.')
      return [];
    }

    const username = this.form.value['username'];
    const email = this.form.value['email'];
    const password = this.form.value['password'];
    
    return (this.formType == 'login') ? [username, password] : [username, email, password]
  }

  login(username: string, password: string) {
    console.log('login')

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log(data)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        this.router.navigate(['profile'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  signUp(username: string, email: string, password: string) {
    console.log('sign up');
    this.submitted = true;

    this.authService.register(username, email, password).subscribe({
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
