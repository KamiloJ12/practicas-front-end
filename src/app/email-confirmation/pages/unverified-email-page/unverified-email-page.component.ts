import { Component, inject } from '@angular/core';
import { EmailConfirmationService } from '../../services/email-confirmation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-unverified-email-page',
  templateUrl: './unverified-email-page.component.html',
  styleUrls: ['./unverified-email-page.component.css'],
  providers: [MessageService],
})
export class UnverifiedEmailPageComponent {
  private emailConfirmationService = inject( EmailConfirmationService );
  private messageService = inject( MessageService );

  sendVerificationLink() {
    this.emailConfirmationService.resendConfirmationLink()
      .subscribe({
        next: () => this.messageService.add({
          severity: 'success',
          detail: 'Se ha enviado el link de verificación',
          life: 3000
        }),
        error: (error) => this.messageService.add({
          severity: 'error',
          detail: error,
          life: 3000
        })
      });
  }
}
