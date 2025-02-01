import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ShotNamePipe } from '../pipes/shot-name.pipe';
import { UserService } from 'src/app/services/user/user.service';
import { ProfileService } from 'src/app/services/profile/profile.service';


@Component({
  selector: 'app-nav-bar',
  standalone:true,
  imports: [CommonModule,ShotNamePipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

    private readonly userService = inject(UserService);
    private readonly router: Router = inject(Router);
    readonly profileService: ProfileService = inject(ProfileService);
    is_logged_in = false
    is_home = false
    ngOnInit(): void {
    this.is_logged_in = this.userService.isLoggedIn()
    this.is_home = this.router.url === '/'

  }

  public userName = "implementar nome"

  navigate(route:string){
    this.router.navigate([route])
  }

  is_collapsed = false;
  toggleCollapse(){
    this.is_collapsed = !this.is_collapsed
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
