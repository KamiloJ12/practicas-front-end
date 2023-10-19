import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RequestResetPasswordPageComponent } from './pages/request-reset-password-page/request-reset-password-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { UnverifiedEmailPageComponent } from './pages/unverified-email-page/unverified-email-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    children: [
      { 
        path: 'login', 
        canActivate: [ isNotAuthenticatedGuard ], 
        component: LoginPageComponent 
      },
      { 
        path: 'register',
        canActivate: [ isNotAuthenticatedGuard ],  
        component: RegisterPageComponent },
      { 
        path: 'request-reset-password',
        canActivate: [ isNotAuthenticatedGuard ],  
        component: RequestResetPasswordPageComponent 
      },
      { 
        path: 'reset-password/:token',
        canActivate: [ isNotAuthenticatedGuard ],  
        component: ResetPasswordPageComponent 
      },
      { 
        path: 'unverified-email', 
        canActivate: [ isAuthenticatedGuard ],
        component: UnverifiedEmailPageComponent},
      { 
        path: 'verify-email', component: VerifyEmailPageComponent },
      { path: '**', redirectTo: 'login'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }