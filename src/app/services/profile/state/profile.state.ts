import { DestroyRef, inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserData } from "src/app/models/interfaces/user/RequestInterface";
import { GetUser, UpdateAddress, UpdateUser } from "../action/profile.actions";
import { ProfileApiService } from "../api/profile-api.service";
import { switchMap, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@State<UserData>({
  name:'profile',
  defaults:{
    id: "",
    name: "",
    email: "",
    cpf: "",
    tel: "",
    whats_app: "",
    is_admin: false,
    address:{
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      postal_code: ""
    }
  }
})
@Injectable()
export class ProfileState{
  destroyRef = inject(DestroyRef)
  private readonly profileApi:ProfileApiService = inject(ProfileApiService)
  @Selector()
  static getUser(state:UserData){
    return state
  }

  @Selector()
  static getUserName(state:UserData){
    return state.name
  }

  refetchUser(ctx:StateContext<UserData>){
    return this.profileApi.getUser().pipe(
      tap({
        next:(result)=> ctx.patchState(result)
      })
    )
  }

  @Action(GetUser)
  getUser(ctx:StateContext<UserData>){
    this.profileApi.getUser().pipe(
      tap({
        next:(result)=>{
          console.log("result get user:",result)
          ctx.patchState(result)
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }
  @Action(UpdateUser)
  updateUser(ctx:StateContext<UserData>,{updateUser}:UpdateUser){
    this.profileApi.updateUser(updateUser).pipe(
      tap({
        next:(result)=>{
          console.log("result update user:",result)
        }
      }),
      switchMap((_)=>this.refetchUser(ctx)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }

  @Action(UpdateAddress)
  updateAddress(ctx:StateContext<UserData>,{updateAddress}:UpdateAddress){
    this.profileApi.updateAddress(updateAddress).pipe(
      tap({
        next:(result)=>{
          console.log("result update address:",result)
        }
      }),
      switchMap((_)=>this.refetchUser(ctx)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }

}
