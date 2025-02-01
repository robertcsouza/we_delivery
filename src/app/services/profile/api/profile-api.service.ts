import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { UpdateAddressRequest, UpdateUserRequest } from '../../../models/interfaces/profile/profile-api.interfaces';
import { AuthResponse, UserData } from 'src/app/models/interfaces/user/RequestInterface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private readonly API_URL = environment.API_URL
  private readonly http:HttpClient = inject(HttpClient)
  private readonly cookie:CookieService = inject(CookieService)
  private readonly router:Router = inject(Router)
  constructor() { }
  private readonly httpOptions ={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookie.get('bearer')}`
  })
  }
  getUser():Observable<UserData>{
    return  this.http.get<AuthResponse>(`${this.API_URL}/user`,this.httpOptions).pipe(map((response)=> response.data))
  }

  updateUser(updateUser:UpdateUserRequest){
    return  this.http.put<AuthResponse>(`${this.API_URL}/user/update/user`,updateUser,this.httpOptions).pipe(map((response)=> response.data))
  }

  updateAddress(updateAddress:UpdateAddressRequest){
    return  this.http.put<AuthResponse>(`${this.API_URL}/user/update/adress`,updateAddress,this.httpOptions).pipe(map((response)=> response.data))
  }



}
