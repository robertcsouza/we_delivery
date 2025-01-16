import { NgModule } from '@angular/core';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CreateOrderComponent } from './modules/dashboard/pages/create-order/create-order.component';
import { PerfilComponent } from './modules/perfil/perfil.component';

const routes: Routes = [
{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},
{
  path: 'home',
  component: HomeComponent,
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: 'register',
  component: SignUpComponent,
},
{
  path: 'dashboard',
  component:DashboardComponent,
  canActivate: [AuthGuard],
},
{
  path: 'dashboard/order/create',
  component:CreateOrderComponent,
  canActivate: [AuthGuard],
},
{
  path: 'perfil',
  component:PerfilComponent,
  canActivate: [AuthGuard],
},
// {
//   path: 'products',
//   loadChildren: () =>
//     import('./modules/products/products.module').then(
//       (m) => m.ProductsModule
//     ),
//   canActivate: [AuthGuard],
// },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
