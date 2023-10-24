import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);
  
  public preferencesForm: FormGroup = this.fb.group({
    hardSoftMaintance: [null, [ Validators.required ]],
    networkMaintance: [null, [ Validators.required ]],
    training: [null, [ Validators.required ]],
    softDevelopment: [null, [ Validators.required ]],
    cloudComputing: [null, [ Validators.required ]],
    projectManager: [null, [ Validators.required ]],
    artificialIntelligence: [null, [ Validators.required ]],
  });


  get preferencesInfo() {
    return this.preferencesForm.value;
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.preferencesForm, field );
  }

  submitForm() {
    this.formDataService.setFormData({
      ...this.formDataService.getFormData(),
      ...this.preferencesForm.value
    });
    console.log(this.formDataService.getFormData());
    
    if (this.preferencesForm.invalid) {
      return this.preferencesForm.markAllAsTouched();
    }
    this.formDataService.setFormData({
      ...this.formDataService.getFormData(),
      ...this.preferencesForm.value
    });
    console.log(this.formDataService.getFormData());
    this.router.navigateByUrl('/student/register/identity-information');
  }
}
