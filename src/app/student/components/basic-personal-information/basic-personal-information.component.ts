import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

import { DepartmentService, MunicipalityService, ValidatorsService } from 'src/app/shared/services';
import { Department, Municipality } from 'src/app/shared/interfaces';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-basic-personal-information',
  templateUrl: './basic-personal-information.component.html',
  styleUrls: ['./basic-personal-information.component.css']
})
export class BasicPersonalInformationComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private departmentService = inject(DepartmentService);
  private munipalityService = inject(MunicipalityService);
  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);

  public basicPersonalForm: FormGroup = this.fb.group({
    firstName: ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    gender: ['Masculino', [ Validators.required ]],
    birthdate: ['', [ Validators.required ]],
    address: ['', [ Validators.required ]],
    phoneNumber: ['', [ Validators.required ]],
    residenceDepartament: ['', [ Validators.required ]],
    residenceMunicipality: ['', [ Validators.required ]],
    resumeDocumentFile: [null, [ Validators.required ]]
  });

  public filteredMunicipalities: Municipality[] = [];
  public filteredDepartments: Department[] = [];

  get basicPersonalInfo() {
    return this.basicPersonalForm.value;
  } 

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.basicPersonalForm, field );
  }

  filterMunicipality(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    const departament = this.basicPersonalForm.get('residenceDepartament')?.value.name;
    // this.munipalityService.getSuggestion(query, departament)
    //   .subscribe( municipalities => this.filteredMunicipalities = municipalities ); 
  }

  filterDepartament(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    // this.departmentService.getSuggestion(query)
    //   .subscribe( departments => this.filteredDepartments = departments ); 
  }

  onDocumentFileChange(file: File) {
    this.basicPersonalForm.get('resumeDocumentFile')?.setValue(file);
  }

  submitForm() {
    this.formDataService.setFormData(this.basicPersonalForm.value);
    if (this.basicPersonalForm.invalid) {
      return this.basicPersonalForm.markAllAsTouched();
    }
    this.formDataService.setFormData(this.basicPersonalForm.value);
    this.router.navigateByUrl('/student/register/identity-information');
  }
}
