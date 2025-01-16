import { inject, Injectable } from '@angular/core';
import { UserService } from '../services/api/user/user.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/api/profile.service';

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
    this.profileService.getUser()
    return true;
  }
}
