import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileService } from 'src/app/services/api/profile.service';
import { ShotNamePipe } from "../pipes/shot-name.pipe";

@Component({
  selector: 'app-nav-bar',
  standalone:true,
  imports: [CommonModule, ShotNamePipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  private readonly router: Router = inject(Router);
  readonly profileService: ProfileService = inject(ProfileService);

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
