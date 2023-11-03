import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services';
import { FormDataService } from '../../services/form-data.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-register-development-areas',
  templateUrl: './register-development-areas.component.html',
  styleUrls: ['./register-development-areas.component.css']
})
export class RegisterDevelopmentAreasComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  
  private studentsService = inject(StudentsService);
  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);
  
  public form: FormGroup = this.fb.group({
    hardSoftMaintenance: [null, [ Validators.required ]],
    networkMaintenance: [null, [ Validators.required ]],
    training: [null, [ Validators.required ]],
    softDevelopment: [null, [ Validators.required ]],
    cloudComputing: [null, [ Validators.required ]],
    projectManager: [null, [ Validators.required ]],
    artificialIntelligence: [null, [ Validators.required ]],
  });

  public ngOnInit(): void {
    const data = this.formDataService.getFormData()?.developmentArea;
    this.form.patchValue(data);    
  }

  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.form, field );
  }

  public onSubmit(): void {
    if(!this.form.valid) return this.form.markAllAsTouched();
    
    this.formDataService.setDevelopmentAreaData(this.form.value);
    this.studentsService.createStudent(this.formDataService.getFormDataToSubmit())
      .subscribe();
    //this.router.navigateByUrl('/student/register/new-programming-language');
  }

  public onBack(): void {
    this.router.navigateByUrl('/student/register/new-medical-information');
  }
}
