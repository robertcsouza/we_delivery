import { Action } from "../../enums/ActionEnums";


export interface Params {
    action: Action;
    id?:string;
    body?:any;
}
