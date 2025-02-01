import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/interfaces/user/RequestInterface';
import { UserService } from 'src/app/services/user/user.service';

import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    imports:[NavBarComponent,CommonModule,ReactiveFormsModule],
    standalone: true
})
export class SignUpComponent  {
  showPassword = false;
  showConfirmPassword = false;
  formBuilder:FormBuilder = inject(FormBuilder)
  readonly userService: UserService = inject(UserService)
  constructor(){}

  signupFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    cpf: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });


  createAccount(){
    if (this.signupFormGroup.valid) {

        this.userService.singUp(this.signupFormGroup.value as RegisterRequest)
    }

  }



}
