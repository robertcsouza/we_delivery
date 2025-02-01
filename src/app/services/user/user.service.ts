
import {  inject, Injectable, input, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import {catchError, EMPTY, map, Observable, of, OperatorFunction, Subject, switchMap, tap,} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import { Router } from '@angular/router';
import { Effect } from 'src/app/models/interfaces/effects/EffectInterface';
import { AuthRequest, AuthResponse, RegisterRequest } from 'src/app/models/interfaces/user/RequestInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Effect {
  private readonly API_URL = environment.API_URL
  private readonly http:HttpClient = inject(HttpClient)
  private readonly cookie:CookieService = inject(CookieService)
  private readonly router:Router = inject(Router)

  constructor() { }

  loginError = signal<string|undefined>(undefined)
  registerError = signal<string|undefined>(undefined)
  public login = this.effect(switchMap((input:AuthRequest)=>this._login(input)),this.loginError)

  public singUp = this.effect(switchMap((input:RegisterRequest)=>this._register(input)),this.registerError)



  effect<T, U>(fn: OperatorFunction<T, U>, errorSignal?: WritableSignal<string | undefined>): (input: T) => void {

    const subject = new Subject<T>()
    subject.pipe(
      fn,
      takeUntilDestroyed()
    ).subscribe()
    return (input)=>{
        subject.next(input)
    }
  }




  private _login(authRequest:AuthRequest){
   return  this.http.post<AuthResponse>(`${this.API_URL}/user/login`,authRequest).pipe(
    tap({
      next:(response)=>{
        console.log(response)
        this.cookie.delete('bearer')
        this.cookie.set('bearer',response.data)
        this.router.navigate(['/dashboard'])
      },

    }),
    catchError((err)=>{
      console.log(err.error.detail)
      this.loginError.set(err.error.detail)
      return EMPTY
    })
    )
  }

  private _register(register:RegisterRequest){
    console.log(register)
   return  this.http.post<AuthResponse>(`${this.API_URL}/user/register`,register).pipe(
    tap({
      next:(response)=>{
        console.log(response)
        this.cookie.delete('bearer')
        this.cookie.set('bearer',response.data)
        this.router.navigate(['/dashboard'])
      },

    }),
    catchError((err)=>{
      console.log(err.error.detail)
      this.loginError.set(err.error.detail)
      return EMPTY
    })
    )
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('bearer');
    return !!JWT_TOKEN ;
  }

}

