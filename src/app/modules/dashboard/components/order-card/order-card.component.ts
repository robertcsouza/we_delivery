import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  purchase: any =
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
    }

}
