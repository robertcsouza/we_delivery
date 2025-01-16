
import {  inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthAction, AuthRequest, AuthResponse } from '../../../models/interfaces/user/RequestInterface';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, OperatorFunction, Subject, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop'
import { Router } from '@angular/router';
import { Action } from 'src/app/models/enums/UserEnums';
type SortDirection = 'ASC' | 'DESC';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.API_URL
  constructor() { }
  private readonly http:HttpClient = inject(HttpClient)
  private readonly cookie:CookieService = inject(CookieService)
  private readonly router:Router = inject(Router)

  loginError = signal<string|undefined>(undefined)

  public login = this.effect(switchMap((input:string)=>this._login(input)),this.loginError)

  dologin(){
    this.login('qualquer coisa')
  }

  effect<T,U>(fn: OperatorFunction<T, U>,errorSignal?:WritableSignal<string | undefined>):(input:T)=> void{
    const subject = new Subject<T>()
    subject.pipe(
      fn,
      takeUntilDestroyed()
    ).subscribe(
      {
        error:(err)=>{
          errorSignal?.set(err)
        }
      }
    )
    return (input)=>{
        subject.next(input)
    }
  }



  private _login(userName:string){
    //requisiçao pra api
   return  of(`retorno do login`).pipe(
      map(()=>{throw 'erro no pipe'})
    )
  }









  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('bearer');
    return JWT_TOKEN ? true : false;
  }

}

