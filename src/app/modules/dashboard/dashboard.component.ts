import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { OrderCardComponent } from "./components/order-card/order-card.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

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
  imports: [NavBarComponent, OrderCardComponent,CommonModule,FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent {
  searchText: string = '';
  pendingReviews: number = 9;
  purchases: Purchase[] = [
    {
      id: 1,
      date: '12 de setembro de 2024',
      status: 'Entregue',
      deliveryDate: '17 de setembro',
      fullDelivery: true,
      product: {
        name: '01 Massa Tapa Tudo 5000 90g + 01 Zero Trinca E Fissuras 420g',
        quantity: '1 unidade',
        image: 'assets/product1.jpg'
      },
      seller: {
        name: 'NEW ECOLOGIC'
      }
    },
    {
      id: 2,
      date: '24 de junho de 2024',
      status: 'Entregue',
      deliveryDate: '1 de julho',
      fullDelivery: true,
      product: {
        name: 'Almofada Compatível Fone De Ouvido Jbl Tune 700bt Tune 750bt',
        quantity: '1 un. | Cor: Preta',
        image: 'assets/product2.jpg'
      },
      seller: {
        name: 'HEAD.GAMER.TECH.COMPANY'
      }
    }
  ];
}
