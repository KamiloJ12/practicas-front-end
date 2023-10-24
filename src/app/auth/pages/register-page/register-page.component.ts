import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  providers: [MessageService],
})
export class RegisterPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );
  private messageService = inject( MessageService );
  private validatorsService = inject( ValidatorsService );

  public registerForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.registerForm, field );
  }

  public login(): void {
    if( !this.registerForm.valid ) 
      return this.registerForm.markAllAsTouched();

    const { email, password } = this.registerForm.value;
    this.authService.register( email, password )
      .subscribe({
        next: () => this.router.navigateByUrl('/coordinator/'),
        error: (error) => this.messageService.add({
          severity: 'error',
          detail: 'Ocurrio un error al intentar realizar el registro',
          life: 3000
        })
      });
  }
}
