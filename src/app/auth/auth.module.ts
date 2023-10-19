import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';

import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { RequestResetPasswordPageComponent } from './pages/request-reset-password-page/request-reset-password-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    RequestResetPasswordPageComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    
    PrimeNgModule,
    SharedModule,
  ]
})
export class AuthModule { }
