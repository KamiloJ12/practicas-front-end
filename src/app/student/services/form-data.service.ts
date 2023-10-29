import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData = new FormData();

  getFormData(): FormData {
    return this.formData;
  }

  setFormData(data: FormData): void {
    this.formData = { ...data };
  }

  updateFormData(form: FormGroup): void {
    for (const controlName in form.controls) {
      if (form.controls.hasOwnProperty(controlName)) {
        const control = form.get(controlName);
        this.formData.append(controlName, control?.value);
      }
    }
  }

  setBasicData(form: FormGroup): void {
    for (const controlName in form.controls) {
      if (form.controls.hasOwnProperty(controlName)) {
        const control = form.get(controlName);
        this.formData.append(controlName, control?.value);
      }
    }
    this.formData.append('residenceDepartament', JSON.stringify(form.get('residenceDepartament')?.value));
    this.formData.append('residenceMunicipality', JSON.stringify(form.get('residenceMunicipality')?.value));
  }

  setIdentityDocumentData(form: FormGroup): void {
    this.formData.append('identityDocument', JSON.stringify(form.value));
    this.formData.append('documentFile', form.get('documentFile')?.value);
  }

  setHealthData(form: FormGroup): void {
    this.formData.append('healthCareCompanyEnrollment', JSON.stringify(form.value));
    this.formData.append('documentHealthFile', form.get('documentHealthFile')?.value);
    //this.formData.healthCareCompanyEnrollment = data;
  }

  setDevelopmentAreaData(form: FormGroup): void {
    this.formData.append('developmentArea', JSON.stringify(form.value));
    //this.formData.developmentArea = data;
  }

  setProgrammingLanguagesData(form: any): void {
    this.formData.append('programmingLanguages', JSON.stringify(form));
    //this.formData.programmingLanguages = data;
  }

  setFrameworksData(form: any): void {
    this.formData.append('frameworks', JSON.stringify(form));
    //this.formData.frameworks = data;
  }

  clearFormData(): void {
    this.formData = new FormData();
  }
}
