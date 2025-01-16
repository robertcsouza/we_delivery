
import {  inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthAction, AuthRequest, AuthResponse } from '../../../models/interfaces/user/RequestInterface';
import {map, Observable, of, OperatorFunction, Subject, switchMap, tap,} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import { Router } from '@angular/router';
import { Effect } from 'src/app/models/interfaces/effects/EffectInterface';

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

  public login = this.effect(switchMap((input:AuthRequest)=>this._login(input)),this.loginError)

  effect<T, U>(fn: OperatorFunction<T, U>, errorSignal?: WritableSignal<string | undefined>): (input: T) => void {
    const subject = new Subject<T>()
    subject.pipe(
      fn,
      takeUntilDestroyed()
    ).subscribe(
      {
        next:(response)=>{
          console.log(response)
          this.cookie.delete('bearer')
          this.cookie.set('bearer',response as string)
          this.router.navigate(['/dashboard'])
        },
        error:(err)=>{
          console.log(err.error.detail)
          this.loginError.set(err.error.detail)
        }
      }
    )
    return (input)=>{
        subject.next(input)
    }
  }

  private _login(authRequest:AuthRequest){
   return  this.http.post<AuthResponse>(`${this.API_URL}/user/login`,authRequest).pipe(
    map((response)=> response.data)
    )
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('bearer');
    return !!JWT_TOKEN ;
  }

}

