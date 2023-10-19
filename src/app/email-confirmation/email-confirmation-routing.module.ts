import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnverifiedEmailPageComponent } from './pages/unverified-email-page/unverified-email-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { isAuthenticatedGuard } from '../auth/guards';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'unverified-email',
        canActivate: [ isAuthenticatedGuard ],  
        component: UnverifiedEmailPageComponent 
      },
      { path: 'verify-email', component: VerifyEmailPageComponent },     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailConfirmationRoutingModule { }
