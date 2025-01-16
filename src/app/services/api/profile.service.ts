import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, map, Subject, switchMap, tap } from 'rxjs';
import { Action } from 'src/app/models/enums/ActionEnums';
import { Params } from 'src/app/models/interfaces/actions/ActionInterface';
import { AuthRequest, UserResponse } from 'src/app/models/interfaces/user/RequestInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
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
    profileSubject$ = new Subject<Params>()
    public user = toSignal(this.profileSubject$.pipe(switchMap((params)=>this.profileActions(params))))


    public getUser(){
      this.profileSubject$.next({action:Action.GET_ONE})
    }

    profileActions(params:Params){
      switch (params.action) {
        case Action.GET_ONE:
          return this._getUser()
        default:
          return EMPTY;
      }
    }

  private _getUser(){
    return  this.http.get<UserResponse>(`${this.API_URL}/user`,this.httpOptions).pipe(map((response)=>response.data))

  }

}
