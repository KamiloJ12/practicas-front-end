import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { CountryService, DepartmentService, DocumentTypeService, MunicipalityService, ValidatorsService } from 'src/app/shared/services';
import { Country, Department, DocumentType, Municipality } from 'src/app/shared/interfaces';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-register-identity-documentation',
  templateUrl: './register-identity-documentation.component.html',
  styleUrls: ['./register-identity-documentation.component.css']
})
export class RegisterIdentityDocumentationComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  
  private countryService = inject(CountryService);
  private departmentService = inject(DepartmentService);
  private munipalityService = inject(MunicipalityService);
  private documentTypeService = inject(DocumentTypeService);
  private studentsSerive = inject(StudentsService);
  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);

  public documentsType: DocumentType[] = [];
  public countries: Country[] = [];
  public departments: Department[] = [];
  public municipalities: Municipality[] = [];

  public form: FormGroup = this.fb.group({
    documentNumber: [null, [ Validators.required, Validators.min(0) ]],
    issuancePlace: [null, [ Validators.required ]],
    issuanceDate: [null, [ Validators.required ]],
    documentFile: [null, [ Validators.required, this.validatorsService.validatePdfFileType ]],
    documentType: [null, [ Validators.required ]],
  });


  public ngOnInit(): void {
    this.documentTypeService.findAll()
      .subscribe( documentsType => this.documentsType = documentsType );
      
    this.countryService.findAll()
      .subscribe( countries => this.countries = countries );
  }

  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.form, field );
  }

  public onDocumentFileChange(file: File): void {
    this.form.get('documentFile')?.setValue(file);
  }

  public onCountryChange(event: any): void {
    const countryId = event?.value?.id;
    if(!countryId) return;

    this.departmentService.findByCountry(event.value.id)
      .subscribe( departments => this.departments = departments );
    
    this.municipalities = [];
  }

  public onDepartmentChange(event: any): void {
    const departmentId = event?.value?.id;
    if(!departmentId) return;

    this.munipalityService.findByDepartment(event.value.id)
      .subscribe( municipalities => this.municipalities = municipalities );
  }

  public onSubmit(): void {
    //if(!this.form.valid) return this.form.markAllAsTouched();
    this.formDataService.setIdentityDocumentData(this.form);
    this.router.navigateByUrl('/student/register/new-academy-information');
  }

  public onBack(): void {
    this.router.navigateByUrl('/student/register/new-basic-information');
  }
}
