import { inject, Injectable } from '@angular/core';

import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile/profile.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor() { }
  private readonly userService:UserService = inject(UserService)
  private readonly profileService:ProfileService = inject(ProfileService)
  private readonly router:Router = inject(Router)
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    this.userService.isLoggedIn();
    return true;
  }
}
