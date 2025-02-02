import { Store } from '@ngxs/store';
import { inject, Injectable, Signal } from '@angular/core';
import { OrderData, OrderRequest } from 'src/app/models/interfaces/orders/orders.interface';
import { OrderState } from './state/orders.state';
import { CreateOrder, GetOrders } from './action/orders.actions';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly store:Store = inject(Store)
  constructor() { }

  orders:Signal<OrderData[]> = this.store.selectSignal(OrderState.getOrders)

  getOrders(){
    this.store.dispatch(new GetOrders())
  }

  createOrders(orderRequest:OrderRequest){
    this.store.dispatch(new CreateOrder(orderRequest))
  }

}
