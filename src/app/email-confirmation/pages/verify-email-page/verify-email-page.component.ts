import { Component, inject } from '@angular/core';
import { EmailVerificationStatus } from '../../enums/email-verification-status.enum';
import { EmailConfirmationService } from '../../services/email-confirmation.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css'],
  providers: [MessageService],
})
export class VerifyEmailPageComponent {
  private emailConfirmationService = inject( EmailConfirmationService );
  private messageService = inject( MessageService );
  private authService = inject( AuthService );
  public status = EmailVerificationStatus.verifiying;
  private token: string = '';

  constructor(private route: ActivatedRoute) {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }

  ngOnInit(): void {
    this.emailConfirmationService.confirm(this.token)
      .subscribe({
        next: () => this.status = EmailVerificationStatus.successful,
        error: () => this.status = EmailVerificationStatus.unsuccessful,
      });
  }

  sendVerificationLink() {
    this.emailConfirmationService.resendConfirmationLink()
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Se ha enviado el link de verificación',
            life: 3000
          });
          this.authService.checkAuthStatus();
        },
        error: (error) => this.messageService.add({
          severity: 'error',
          detail: error,
          life: 3000
        })
      });
  }
}
