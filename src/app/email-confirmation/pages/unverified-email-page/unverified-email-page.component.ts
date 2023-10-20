import { Component, inject } from '@angular/core';
import { EmailConfirmationService } from '../../services/email-confirmation.service';

@Component({
  selector: 'app-unverified-email-page',
  templateUrl: './unverified-email-page.component.html',
  styleUrls: ['./unverified-email-page.component.css']
})
export class UnverifiedEmailPageComponent {
  private emailConfirmationService = inject( EmailConfirmationService );

  sendVerificationLink() {
    this.emailConfirmationService.resendConfirmationLink()
      .subscribe();
  }
}
