import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-register-academic-information',
  templateUrl: './register-academic-information.component.html',
  styleUrls: ['./register-academic-information.component.css']
})
export class RegisterAcademicInformationComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  
  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);

  public form: FormGroup = this.fb.group({
    studentCode: [null, [ Validators.required, Validators.min(0) ]],
    currentSemester: [null, [ Validators.required, Validators.min(0), Validators.max(30) ]],
    classScheduleFile: [null, [ Validators.required, this.validatorsService.validatePdfFileType ]],
  });

  public ngOnInit(): void {
    const data = this.formDataService.getFormData();
    this.form.patchValue(data);
  }

  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.form, field );
  }

  public onDocumentFileChange(file: File): void {
    this.form.get('classScheduleFile')?.setValue(file);
  }

  public onSubmit(): void {
    if(!this.form.valid) return this.form.markAllAsTouched();
    //this.formDataService.updateFormData(this.form);
    this.formDataService.updateFormData(this.form.value);
    this.router.navigateByUrl('/student/register/new-medical-information');
  }

  public onBack(): void {
    this.router.navigateByUrl('/student/register/new-identity-documentation');
  }
}
