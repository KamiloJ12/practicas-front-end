import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-academic-information',
  templateUrl: './academic-information.component.html',
  styleUrls: ['./academic-information.component.css']
})
export class AcademicInformationComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);
  
  public academyForm: FormGroup = this.fb.group({
    studentCode: [null, [ Validators.required, Validators.min(0) ]],
    currentSemester: [null, [ Validators.required ]],
    classScheduleFile: [null, [ Validators.required, this.validatorsService.validatePdfFileType ]],
  });


  get identityInfo() {
    return this.academyForm.value;
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.academyForm, field );
  }

  onDocumentFileChange(file: File) {
    this.academyForm.get('classScheduleFile')?.setValue(file);
  }

  submitForm() {
    this.formDataService.setFormData({
      ...this.formDataService.getFormData(),
      ...this.academyForm.value
    });
    console.log(this.formDataService.getFormData());
    
    if (this.academyForm.invalid) {
      return this.academyForm.markAllAsTouched();
    }
    this.formDataService.setFormData({
      ...this.formDataService.getFormData(),
      ...this.academyForm.value
    });
    console.log(this.formDataService.getFormData());
    this.router.navigateByUrl('/student/register/identity-information');
  }
}
