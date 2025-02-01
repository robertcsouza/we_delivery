import { UpdateAddressRequest, UpdateUserRequest } from "src/app/models/interfaces/profile/profile-api.interfaces";

export class GetUser{
  static readonly type = '[Profile] get user';
constructor(){}
}

export class UpdateUser{
  static readonly type = '[Profile] update user';
constructor(public updateUser:UpdateUserRequest){}
}


export class UpdateAddress{
  static readonly type = '[Profile] update address';
constructor(public updateAddress:UpdateAddressRequest){}
}
