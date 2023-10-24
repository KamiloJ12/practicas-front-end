import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.css']
})
export class MedicalInformationComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);

  affiliationTypes = [];
  healthCareCompanies = [];
  
  public medicalForm: FormGroup = this.fb.group({
    affiliationType: [null, [ Validators.required ]],
    affiliationDate: [null, [ Validators.required ]],
    documentHealthFile: [null, [ Validators.required, this.validatorsService.validatePdfFileType ]],
    healthCareCompany: [null, [ Validators.required ]],
  });


  get identityInfo() {
    return this.medicalForm.value;
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.medicalForm, field );
  }

  onDocumentFileChange(file: File) {
    this.medicalForm.get('documentHealthFile')?.setValue(file);
  }

  submitForm() {
    this.formDataService.setFormData({
      ...this.formDataService.getFormData(),
      ...this.medicalForm.value
    });
    console.log(this.formDataService.getFormData());
    
    if (this.medicalForm.invalid) {
      return this.medicalForm.markAllAsTouched();
    }
    this.formDataService.setFormData({
      ...this.formDataService.getFormData(),
      ...this.medicalForm.value
    });
    console.log(this.formDataService.getFormData());
    this.router.navigateByUrl('/student/register/identity-information');
  }
}
