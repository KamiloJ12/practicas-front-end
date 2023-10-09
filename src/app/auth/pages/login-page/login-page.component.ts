import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [MessageService],
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );
  private messageService = inject( MessageService );
  private validatorsService = inject( ValidatorsService );

  public loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]]
  });

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.loginForm, field );
  }

  login() {
    if( !this.loginForm.valid ) 
      return this.loginForm.markAllAsTouched();

    const { email, password } = this.loginForm.value;
    this.authService.login( email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/coordinator/'),
        error: (error) => this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
          life: 3000
        })
      });
  }
}
