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
  
  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);

  public documentsType: DocumentType[] = [];
  public countries: Country[] = [];
  public departments: Department[] = [];
  public municipalities: Municipality[] = [];

  public form: FormGroup = this.fb.group({
    documentNumber: [null, [ Validators.required, Validators.min(0) ]],
    issuancePlaceCountry: [null, [ Validators.required ]],
    issuancePlaceDepartment: [null, [ Validators.required ]],
    issuancePlace: [null, [ Validators.required ]],
    issuanceDate: [null, [ Validators.required ]],
    documentFile: [null, [ Validators.required, this.validatorsService.validatePdfFileType ]],
    documentType: [null, [ Validators.required ]],
  });


  public ngOnInit(): void {
    const data = this.formDataService.getFormData()?.identityDocument;
    this.form.patchValue(data);

    this.documentTypeService.findAll()
      .subscribe( documentsType => this.documentsType = documentsType );
      
    this.countryService.findAll()
      .subscribe( countries => this.countries = countries );

    if (data?.issuancePlaceCountry){
      const event = { value: data.issuancePlaceCountry };
      this.onCountryChange(event);

      if (data?.issuancePlaceDepartment){
        const event = { value: data.issuancePlaceDepartment };
        this.onDepartmentChange(event);
      }
    }
  }

  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.form, field );
  }

  public onDocumentFileChange(file: File): void {
    this.form.get('documentFile')?.setValue(file);
  }

  public onCountryChange(event: any): void {
    const countryId = event?.value;
    if(!countryId) return;

    this.departmentService.findByCountry(countryId)
      .subscribe( departments => this.departments = departments );
    
    this.municipalities = [];
  }

  public onDepartmentChange(event: any): void {
    const departmentId = event?.value;
    if(!departmentId) return;

    this.munipalityService.findByDepartment(departmentId)
      .subscribe( municipalities => this.municipalities = municipalities );
  }

  public onSubmit(): void {
    if(!this.form.valid) return this.form.markAllAsTouched();
    //this.formDataService.setIdentityDocumentData(this.form);

    this.formDataService.setIdentityDocumentData(this.form.value);
    this.router.navigateByUrl('/student/register/new-academy-information');
    /*
    const formData = new FormData();
    for (const controlName in this.form.controls) {
      if (this.form.controls.hasOwnProperty(controlName)) {
        const control = this.form.get(controlName);
        formData.append(controlName, control?.value);
      }
    }
    this.studentsService.addIdentityDocumnet(formData)
      .subscribe( next: () => this.router.navigateByUrl('/student/register/new-academy-information'), );
      */
  }

  public onBack(): void {
    this.router.navigateByUrl('/student/register/new-basic-information');
  }
}
