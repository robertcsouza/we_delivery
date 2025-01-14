
import {  inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthAction, AuthRequest, AuthResponse } from '../../../models/interfaces/user/RequestInterface';
import { catchError, EMPTY, map, Observable, of, Subject, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop'
import { Router } from '@angular/router';
import { Action } from 'src/app/models/enums/UserEnums';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.API_URL
  constructor() { }
  private readonly http:HttpClient = inject(HttpClient)
  private readonly cookie:CookieService = inject(CookieService)
  private readonly router:Router = inject(Router)

  authenticateUser$ = new Subject()
  auth$ = new Observable()
  logiError = toSignal(this.authenticateUser$.pipe(switchMap((_)=>this.auth$)),{initialValue:null})

  public login(request:AuthRequest){
    this.authenticateUser$.next(
     this.authActions({action:Action.LOGIN,body:request})
    )
  }

  public register(request:AuthRequest){
    this.authenticateUser$.next(
     this.authActions({action:Action.REGISTER,body:request})
    )
  }

  private authActions(params:AuthAction){
    switch(params.action){
      case Action.LOGIN:
        this.auth$ = this.authenticateRequest(params.body)
        break;
      case Action.REGISTER:
        this.auth$ = this.registerRequest(params.body)
        break;
      default:
        this.auth$ = EMPTY;
      }

  }





  private authenticateRequest(request:AuthRequest){
    return this.http.post<AuthResponse>(`${this.API_URL}/user/login`,request).pipe(
      tap({
        next:(response)=>{
          if(response.status ===  'success'){
            this.cookie.delete('bearer')
            this.cookie.set('bearer',response.data)
            this.router.navigate(['/dashboard'])
          }
          return EMPTY
        }
      }),

      map((response)=>{
        if(response.status ===  'success')  return null
        return response.data
      } )
    )
  }

  private registerRequest(request:AuthRequest){
    return this.http.post<AuthResponse>(`${this.API_URL}/user/register`,request).pipe(
      tap({
        next:(response)=>{
          if(response.status ===  'success'){
            this.router.navigate(['/login'])
          }
          return EMPTY
        }
      }),

      map((response)=>{
        if(response.status ===  'success')  return null
        return response.data
      } )
    )
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('bearer');
    return JWT_TOKEN ? true : false;
  }





}

