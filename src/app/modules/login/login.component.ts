import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/RequestInterface';
import { UserService } from 'src/app/services/api/user/user.service';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, NavBarComponent],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPassword = false;


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Add your login logic here
    }
  }
  private readonly formBuilder:FormBuilder = inject(FormBuilder)
  readonly userService: UserService = inject(UserService)
  private readonly cookieService: CookieService = inject(CookieService)
  private readonly router: Router = inject(Router)

    loginForm = this.formBuilder.group({
      user:['',Validators.required],
      password:['',Validators.required]
    })

    onHandleSubmitForm():void {
        this.userService.dologin()
        // this.userService.login(this.loginForm.value as AuthRequest)
    }


}
