import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './services/profile/state/profile.state';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    NavBarComponent,
    NgxsModule.forRoot([ProfileState])

],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
