import { Action } from "../../enums/UserEnums";

export interface AuthRequest {
  user: string;
  password: string;
}

export interface RegisterRequest {
  _id: string
  name: string
  email: string
  password: string
  cpf: string
  tel: string
  whats_app: string
  disabled: boolean
}





export interface AuthAction {
  action: Action;
  id?:string;
  body?:any;

}
export interface AuthResponse {
  message: string;
  status: string;
  data: string;
}



