import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})

export class BoardAdminComponent implements OnInit {
  content?: string;
  currentUser: User;
  submitted = false;
  uploadedFiles: any[] = [];
  barberServices: string[] = [];
  form: FormGroup = new FormGroup({
    barbershop: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService,
    private token: TokenStorageService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser)

    this.setFormRules();

    // Set Services
    this.barberServices = ['Hair cut', 'Shave', 'Eyebrow', 'Others'];
  }

  // @TODO - move to a shared
  setFormRules() {
    // Set up form rules
    this.form = this.formBuilder.group(
      {
        barbershop: [this.currentUser.username, {
          validators: [
            Validators.required
          ],
          updateOn: 'blur'
        }],
        email: [this.currentUser.email, {
          validators: [
            Validators.required,
            Validators.email
          ],
          disabled: true,
          updateOn: 'blur'
        }],
        phoneNumber: [this.currentUser.phoneNumber, {
          validators: [
            Validators.required,
            Validators.pattern('[- +()0-9]{6,}')
          ],
          updateOn: 'blur'
        }],
        price: [this.currentUser.price, {
          updateOn: 'blur' 
        }],
        services: [this.currentUser.services, {
          validators: [
            Validators.required,
            Validators.pattern('[- +()0-9]{6,}')
          ],
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
    console.log(JSON.stringify(this.form.value, null, 2));
    const barbershop = this.form.value['barbershop'];
    const email = this.form.value['email'];
    const phoneNumber = this.form.value['phoneNumber'];
    const password = this.form.value['password'];

    this.updateInfo()
  }

  updateInfo() {
    console.log('update service')

  }

  onImageUpload(uploader: any) {
    this.uploadedFiles = uploader._files
    console.log(this.uploadedFiles)
  }

}