import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { OrderCardComponent } from "./components/order-card/order-card.component";

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [NavBarComponent, OrderCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
