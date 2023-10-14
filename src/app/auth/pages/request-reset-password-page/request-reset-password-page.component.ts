import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-request-reset-password-page',
  templateUrl: './request-reset-password-page.component.html',
  styleUrls: ['./request-reset-password-page.component.css'],
  providers: [MessageService],
})
export class RequestResetPasswordPageComponent {
  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );
  private messageService = inject( MessageService );
  private validatorsService = inject( ValidatorsService );

  public resetPasswordForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ]],
  });

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.resetPasswordForm, field );
  }

  requestResetPassword() {
    if( !this.resetPasswordForm.valid ) 
      return this.resetPasswordForm.markAllAsTouched();

    const { email } = this.resetPasswordForm.value;
    this.authService.requestResetPassword( email )
      .subscribe({
        next: () => this.router.navigateByUrl('/coordinator/'),
        error: (error) => this.messageService.add({
          severity: 'error',
          detail: 'Ocurrio un error al intentar recuperar la contraseña',
          life: 3000
        })
      });
  }
}
