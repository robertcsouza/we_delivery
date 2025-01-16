import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    standalone: false
})
export class SignUpComponent implements OnInit {
  showPassword = false;
  showConfirmPassword = false;
  formBuilder:FormBuilder = inject(FormBuilder)
  constructor(){}


  adressFormGroup = this.formBuilder.group({
    street: ['', Validators.required],
    neighborhood: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    postal_code: ['', Validators.required],
  });
  signupFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    cpf: ['', Validators.required],
    tel: ['', Validators.required],
    whats_app: ['', Validators.required],
    address: [{}, Validators.required],
  });


  ngOnInit(): void {

  }
  handleResult(){
    console.log(this.signupFormGroup.value)
    console.log(this.adressFormGroup.value)

  }



}
