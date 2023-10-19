import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailConfirmationRoutingModule } from './email-confirmation-routing.module';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { UnverifiedEmailPageComponent } from './pages/unverified-email-page/unverified-email-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    VerifyEmailPageComponent,
    UnverifiedEmailPageComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    EmailConfirmationRoutingModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class EmailConfirmationModule { }
