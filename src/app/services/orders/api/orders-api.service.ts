import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { OrderData, OrderRequest } from 'src/app/models/interfaces/orders/orders.interface';
import { AuthResponse } from 'src/app/models/interfaces/user/RequestInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {
   private readonly API_URL = environment.API_URL
    private readonly http:HttpClient = inject(HttpClient)
    private readonly cookie:CookieService = inject(CookieService)
    private readonly router:Router = inject(Router)
    private readonly httpOptions ={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookie.get('bearer')}`
      })
    }
  constructor() { }
  getOrders():Observable<OrderData[]>{
    return  this.http.get<AuthResponse>(`${this.API_URL}/order`,this.httpOptions).pipe(map((response)=> response.data))
  }
  createOrder(orderRequest:OrderRequest):Observable<OrderData[]>{
    return  this.http.post<AuthResponse>(`${this.API_URL}/order/create`,orderRequest,this.httpOptions).pipe(map((response)=> response.data))
  }
}
