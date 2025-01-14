import { toSignal } from '@angular/core/rxjs-interop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone:true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  is_collapsed = false;
  toggleCollapse(){
    this.is_collapsed = !this.is_collapsed
  }
}
