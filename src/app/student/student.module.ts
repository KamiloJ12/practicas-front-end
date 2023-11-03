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
import { StudentLayoutComponent } from './layout/student-layout/student-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    RegisterBasicInformationComponent,
    RegisterIdentityDocumentationComponent,
    RegisterAcademicInformationComponent,
    RegisterMedicalInformationComponent,
    RegisterDevelopmentAreasComponent,
    StudentLayoutComponent,
    NavbarComponent,
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
