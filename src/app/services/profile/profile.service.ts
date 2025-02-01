import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { GetUser, UpdateUser, UpdateAddress } from './action/profile.actions';
import { UserData } from 'src/app/models/interfaces/user/RequestInterface';
import { ProfileState } from './state/profile.state';
import { UpdateAddressRequest, UpdateUserRequest } from 'src/app/models/interfaces/profile/profile-api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    private readonly API_URL = environment.API_URL
    private readonly http:HttpClient = inject(HttpClient)
    private readonly cookie:CookieService = inject(CookieService)
    private readonly router:Router = inject(Router)
    private readonly store:Store = inject(Store)
    private readonly httpOptions ={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookie.get('bearer')}`
    })
    }

    constructor() { }

    user:Signal<UserData> = this.store.selectSignal(ProfileState.getUser)

    getUser(){
      this.store.dispatch(new GetUser())
    }

    updateUser(updateUser:UpdateUserRequest){
      this.store.dispatch(new UpdateUser(updateUser))
    }

    updateAddress(updateAdress:UpdateAddressRequest){
      this.store.dispatch(new UpdateAddress(updateAdress))
    }

}
