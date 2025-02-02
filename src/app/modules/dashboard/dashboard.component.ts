import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { OrderCardComponent } from "./components/order-card/order-card.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { BreadCrumbsComponent } from "../../shared/bread-crumbs/bread-crumbs.component";
import { OrdersService } from 'src/app/services/orders/orders.service';

interface Purchase {
  id: number;
  date: string;
  status: 'Entregue';
  deliveryDate: string;
  product: {
    name: string;
    quantity: string;
    image: string;
  };
  seller: {
    name: string;
  };
  fullDelivery?: boolean;
}


@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [NavBarComponent, OrderCardComponent, CommonModule, FooterComponent, BreadCrumbsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit {
  orderService:OrdersService = inject(OrdersService)

  ngOnInit(): void {
    this.orderService.getOrders()
  }

  searchText: string = '';
  pendingReviews: number = 9;
  focus: any;

}
