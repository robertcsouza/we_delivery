import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  private readonly router: Router = inject(Router);
  navItems = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Project', path: '/project' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];
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
