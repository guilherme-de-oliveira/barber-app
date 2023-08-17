import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenUser } from 'src/app/models/token-user.model';
import { BarberService } from 'src/app/services/barber.service';

@Component({
  selector: 'app-barber-form',
  standalone: true,
  templateUrl: './barber-form.component.html',
  styleUrls: ['./barber-form.component.scss'],
  imports: [CommonModule, MultiSelectModule, FileUploadModule, InputTextModule, CardModule, FormsModule, ReactiveFormsModule]
})

export class BarberFormComponent implements OnInit {
  content?: string;
  currentUser: TokenUser;
  userInfo: User;
  submitted = false;
  uploadedFiles: any[] = [];
  barberServices: string[] = ['Hair cut', 'Shave', 'Eyebrow', 'Others'];
  form: FormGroup = new FormGroup({
    barbershop: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password: new FormControl(''),
    price: new FormControl(''),
    address: new FormControl(''),
    images: new FormControl(''),
    barberServices: new FormControl(''),
  });

  constructor(private userService: UserService,
    private token: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private barberService: BarberService) { 
      this.token.user$.subscribe(data => {
        this.currentUser = data
        if (Object.keys(this.currentUser).length === 0) {
          console.log('Not authenticated');
          this.router.navigate(['login']);
        }

        this.barberService.getDetails(this.currentUser.email).subscribe(data => {
          this.userInfo = data;
          this.setFormRules();
        });
      });
    }

  ngOnInit(): void {}

  // @TODO - move to a shared
  setFormRules() {
    // Set up form rules
    this.form = this.formBuilder.group(
      {
        email: [this.userInfo.email, {
          validators: [
            Validators.required,
            Validators.email
          ],
          disabled: true,
          updateOn: 'blur'
        }],
        barbershop: [this.userInfo.username, {
          validators: [
            Validators.required
          ],
          updateOn: 'blur'
        }],
        phoneNumber: [this.userInfo.phoneNumber, {
          validators: [
            Validators.required,
            Validators.pattern('[- +()0-9]{6,}')
          ],
          updateOn: 'blur'
        }],
        price: [this.userInfo.price, {
          updateOn: 'blur' 
        }],
        barberServices: [this.userInfo.barberServices, {
          updateOn: 'blur'
        }],
        address: [this.userInfo.address, {
          updateOn: 'blur'
        }],
        images: [this.userInfo.images, {
          updateOn: 'blur'
        }],
      }
    );
  }

  // @TODO - move to a shared
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  onSubmit(): void {
    const user = this.form.value;
    const barbershop = this.form.value['barbershop'];
    const email = this.form.value['email'];
    const phoneNumber = this.form.value['phoneNumber'];
    const password = this.form.value['password'];

    this.updateBarber(user)
  }

  updateBarber(user: User) {
    this.barberService.updateBarber(user)
  }

  onImageUpload(uploader: any) {
    this.uploadedFiles = uploader._files
  }

}