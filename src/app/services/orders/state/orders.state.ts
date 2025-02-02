import { DestroyRef, inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { OrderData } from "src/app/models/interfaces/orders/orders.interface";
import { OrdersApiService } from "../api/orders-api.service";
import { switchMap, tap } from 'rxjs';
import { CreateOrder, GetOrders } from '../action/orders.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderStateModel } from "../model/order.state.model";

@State<OrderStateModel>({
  name:'order',
  defaults:{
    orders:[]
  }
})
@Injectable()
export class OrderState{
  destroyRef = inject(DestroyRef)
  private readonly ordersApi:OrdersApiService = inject(OrdersApiService)

  @Selector()
  static getOrders(state:OrderStateModel){
    return state.orders
  }

  refetchOrders(ctx:StateContext<OrderStateModel>){
    return this.ordersApi.getOrders().pipe(
      tap({
        next:(result)=> ctx.patchState({orders:result})
      })
    )
  }

  @Action(GetOrders)
  getOrders(ctx:StateContext<OrderStateModel>){

    this.ordersApi.getOrders().pipe(
          tap({
            next:(result)=>{
              console.log(result)
              ctx.patchState({orders:result})
            }
          }),
          takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  @Action(CreateOrder)
  createOrder(ctx:StateContext<OrderStateModel>,{orderRequest}:CreateOrder){
    this.ordersApi.createOrder(orderRequest).pipe(
          tap({
            next:(result)=>{
              console.log("result create order:",result)
            }
          }),
          switchMap((_)=>this.refetchOrders(ctx)),
          takeUntilDestroyed(this.destroyRef)
        ).subscribe()
  }

}
