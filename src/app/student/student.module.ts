import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { RegisterBasicInformationComponent } from './pages/register-basic-information/register-basic-information.component';
import { RegisterIdentityDocumentationComponent } from './pages/register-identity-documentation/register-identity-documentation.component';
import { RegisterAcademicInformationComponent } from './pages/register-academic-information/register-academic-information.component';
import { RegisterMedicalInformationComponent } from './pages/register-medical-information/register-medical-information.component';
import { RegisterDevelopmentAreasComponent } from './pages/register-development-areas/register-development-areas.component';
import { RegisterProgrammingLanguagesComponent } from './pages/register-programming-languages/register-programming-languages.component';
import { RegisterFrameworksComponent } from './pages/register-frameworks/register-frameworks.component';


@NgModule({
  declarations: [
    RegisterBasicInformationComponent,
    RegisterIdentityDocumentationComponent,
    RegisterAcademicInformationComponent,
    RegisterMedicalInformationComponent,
    RegisterDevelopmentAreasComponent,
    RegisterProgrammingLanguagesComponent,
    RegisterFrameworksComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class StudentModule {
}
