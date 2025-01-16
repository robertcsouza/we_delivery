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



