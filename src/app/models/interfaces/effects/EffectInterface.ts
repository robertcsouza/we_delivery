import { OperatorFunction } from "rxjs";


export interface Effect{
  effect<T,U>(fn: OperatorFunction<T, U>):(input:T)=> void
}
