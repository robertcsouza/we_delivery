import { OrderRequest } from "src/app/models/interfaces/orders/orders.interface";

export class GetOrders{
  static readonly type = '[Orders] get orders';
constructor(){}
}

export class CreateOrder{
  static readonly type = '[Orders] create order';
constructor(public orderRequest:OrderRequest){}
}
