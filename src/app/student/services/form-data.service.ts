import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formData: any = {};

  getFormData(): any {
    return this.formData;
  }

  setFormData(data: FormData): void {
    this.formData = { ...data };
  }

  updateFormData(data: any): void {
    this.formData = { ...this.formData, ...data };
  }

  setIdentityDocumentData(data: any): void {
    this.formData.identityDocument = data;
  }

  setHealthData(data: any): void {
    this.formData.healthCareCompanyEnrollment = data;
  }

  setDevelopmentAreaData(data: any): void {
    this.formData.developmentArea = data;
  }

  setProgrammingLanguagesData(data: any): void {
    this.formData.programmingLanguages = data;
  }

  setFrameworksData(data: any): void {
    this.formData.frameworks = data;
  }

  getFormDataToSubmit() {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('firstName', this.formData?.firstName);
    formDataToSubmit.append('lastName', this.formData?.lastName);
    formDataToSubmit.append('gender', this.formData?.gender);
    formDataToSubmit.append('birthdate', this.formData?.birthdate);
    formDataToSubmit.append('address', this.formData?.address);
    formDataToSubmit.append('phoneNumber', this.formData?.phoneNumber);
    formDataToSubmit.append('residenceDepartament', this.formData?.residenceDepartament);
    formDataToSubmit.append('residenceMunicipality', this.formData?.residenceMunicipality);
    formDataToSubmit.append('resumeDocumentFile', this.formData?.resumeDocumentFile);
    formDataToSubmit.append('pictureFile', this.formData?.pictureFile);
     
    const { documentFile, ...restoidentityDocumentData } = this.formData?.identityDocument; 
    formDataToSubmit.append('documentFile', documentFile);
    formDataToSubmit.append('identityDocument', JSON.stringify(restoidentityDocumentData));
    
    formDataToSubmit.append('studentCode', this.formData?.studentCode);
    formDataToSubmit.append('currentSemester', this.formData?.currentSemester);
    formDataToSubmit.append('classScheduleFile', this.formData?.classScheduleFile);

    const { documentHealthFile, ...healthCareCompanyEnrollmentData } = this.formData?.healthCareCompanyEnrollment;
    formDataToSubmit.append('healthCareCompanyEnrollment', JSON.stringify(healthCareCompanyEnrollmentData));
    formDataToSubmit.append('documentHealthFile', documentHealthFile);
    
    formDataToSubmit.append('developmentArea', JSON.stringify(this.formData?.developmentArea));
    formDataToSubmit.append('programmingLanguages', JSON.stringify(this.formData?.programmingLanguages));
    formDataToSubmit.append('frameworks', JSON.stringify(this.formData?.frameworks)); 
    return formDataToSubmit;
  }

  clearFormData(): void {
    this.formData = new FormData();
  }

  console(): void {
    console.log( this.formData );
  }
}
