import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css'],
  providers: [MessageService],
})
export class ResetPasswordPageComponent {
  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );
  private messageService = inject( MessageService );
  private validatorsService = inject( ValidatorsService );

  public resetPasswordForm: FormGroup = this.fb.group({
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  token: string;

  constructor(private route: ActivatedRoute) {
    // Obtener el token de la URL
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }
  
  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.resetPasswordForm, field );
  }

  public resetPassword(): void {
    if( !this.resetPasswordForm.valid ) 
      return this.resetPasswordForm.markAllAsTouched();

    const { password } = this.resetPasswordForm.value;
    this.authService.resetPassword(  password, this.token )
      .subscribe({
        next: () => this.router.navigateByUrl('/auth/login'),
        error: (error) => this.messageService.add({
          severity: 'error',
          detail: error,
          life: 3000
        })
      });
  }
}
