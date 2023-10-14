import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';

import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { UnverifiedEmailPageComponent } from './pages/unverified-email-page/unverified-email-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { RequestResetPasswordPageComponent } from './pages/request-reset-password-page/request-reset-password-page.component';



@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    VerifyEmailPageComponent,
    UnverifiedEmailPageComponent,
    ResetPasswordPageComponent,
    RequestResetPasswordPageComponent
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
