import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AffiliationType, HealthCareCompany } from 'src/app/shared/interfaces';
import { FormDataService } from '../../services/form-data.service';
import { AffiliationTypeService, HealthCareCompanyService, ValidatorsService } from 'src/app/shared/services';

@Component({
  selector: 'app-register-medical-information',
  templateUrl: './register-medical-information.component.html',
  styleUrls: ['./register-medical-information.component.css']
})
export class RegisterMedicalInformationComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  
  private healthCareCompanyService = inject(HealthCareCompanyService);
  private affiliationTypeService = inject(AffiliationTypeService);
  private validatorsService = inject(ValidatorsService);
  private formDataService = inject(FormDataService);

  public healthCareCompanies: HealthCareCompany[] = [];
  public affiliationTypes: AffiliationType[] = [];
  
  public form: FormGroup = this.fb.group({
    affiliationType: [null, [ Validators.required ]],
    affiliationDate: [null, [ Validators.required ]],
    documentHealthFile: [null, [ Validators.required, this.validatorsService.validatePdfFileType ]],
    healthCareCompany: [null, [ Validators.required ]],
  });

  public ngOnInit(): void {
    this.healthCareCompanyService.findAll()
      .subscribe( healthCareCompanies => this.healthCareCompanies = healthCareCompanies );

    this.affiliationTypeService.findAll()
      .subscribe( affiliationTypes => this.affiliationTypes = affiliationTypes );
  }

  public isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.form, field );
  }

  public onDocumentFileChange(file: File): void {
    this.form.get('documentHealthFile')?.setValue(file);
  }

  public onSubmit(): void {
    //if(!this.form.valid) return this.form.markAllAsTouched();
    this.formDataService.setHealthData(this.form);
    this.router.navigateByUrl('/student/register/new-development-area');
  }

  public onBack(): void {
    this.router.navigateByUrl('/student/register/new-academy-information');
  }
}
