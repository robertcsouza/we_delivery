import { Action } from "../../enums/UserEnums";

export interface AuthRequest {
  user: string;
  password: string;
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  cpf: string
}

export interface UserResponse {
  message: string
  status: string
  data: UserData
}

export interface UserData {
  id: string
  name: string
  email: string
  cpf: string
  tel: any
  whats_app: any
  is_admin: boolean
  address: Address
}


export interface Address {
  street: string
  neighborhood: string
  city: string
  state: string
  country: string
  postal_code: string
}

export interface AuthAction {
  action: Action;
  id?:string;
  body?:any;

}


export interface AuthResponse {
  message: string;
  status: string;
  data: any;
}



