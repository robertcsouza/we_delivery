import { Component } from '@angular/core';
import { NavBarComponent } from "../../../../shared/nav-bar/nav-bar.component";

@Component({
  selector: 'app-create-order',
  standalone:true,
  imports: [NavBarComponent],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent {

}
