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
    formDataToSubmit.append('identityDocument[documentNumber]', restoidentityDocumentData.documentNumber);
    formDataToSubmit.append('identityDocument[issuancePlace]', restoidentityDocumentData.issuancePlace);
    formDataToSubmit.append('identityDocument[issuanceDate]', new Date(restoidentityDocumentData.issuanceDate).toISOString());
    formDataToSubmit.append('identityDocument[documentType]', restoidentityDocumentData.documentType);
    //formDataToSubmit.append('identityDocument', restoidentityDocumentData);

    formDataToSubmit.append('studentCode', this.formData?.studentCode);
    formDataToSubmit.append('currentSemester', this.formData?.currentSemester);
    formDataToSubmit.append('classScheduleFile', this.formData?.classScheduleFile);

    const { documentHealthFile, ...healthCareCompanyEnrollmentData } = this.formData?.healthCareCompanyEnrollment;
    formDataToSubmit.append('healthCareCompanyEnrollment[affiliationType]', healthCareCompanyEnrollmentData.affiliationType);
    formDataToSubmit.append('healthCareCompanyEnrollment[affiliationDate]', new Date(healthCareCompanyEnrollmentData.affiliationDate).toISOString());
    formDataToSubmit.append('healthCareCompanyEnrollment[healthCareCompany]', healthCareCompanyEnrollmentData.healthCareCompany);
    formDataToSubmit.append('documentHealthFile', documentHealthFile);
    
    formDataToSubmit.append('developmentArea[hardSoftMaintenance]', this.formData?.developmentArea.hardSoftMaintenance);
    formDataToSubmit.append('developmentArea[networkMaintenance]', this.formData?.developmentArea.networkMaintenance);
    formDataToSubmit.append('developmentArea[training]', this.formData?.developmentArea.training);
    formDataToSubmit.append('developmentArea[softDevelopment]', this.formData?.developmentArea.softDevelopment);
    formDataToSubmit.append('developmentArea[cloudComputing]', this.formData?.developmentArea.cloudComputing);
    formDataToSubmit.append('developmentArea[projectManager]', this.formData?.developmentArea.projectManager);
    formDataToSubmit.append('developmentArea[artificialIntelligence]', this.formData?.developmentArea.artificialIntelligence);

    return formDataToSubmit;
  }

  clearFormData(): void {
    this.formData = new FormData();
  }

  console(): void {
    console.log( this.formData );
  }
}
