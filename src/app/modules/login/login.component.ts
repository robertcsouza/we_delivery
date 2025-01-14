import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/RequestInterface';
import { UserService } from 'src/app/services/api/user/user.service';


@Component({
    selector: 'app-login',
    standalone: true,
    imports:[ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(){}
  private readonly formBuilder:FormBuilder = inject(FormBuilder)
  readonly userService: UserService = inject(UserService)
  private readonly cookieService: CookieService = inject(CookieService)
  private readonly router: Router = inject(Router)

    loginForm = this.formBuilder.group({
      user:['',Validators.required],
      password:['',Validators.required]
    })

    onHandleSubmitForm():void {
        this.userService.login(this.loginForm.value as AuthRequest)
    }


}
