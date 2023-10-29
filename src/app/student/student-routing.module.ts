import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterBasicInformationComponent } from './pages/register-basic-information/register-basic-information.component';
import { RegisterIdentityDocumentationComponent } from './pages/register-identity-documentation/register-identity-documentation.component';
import { RegisterAcademicInformationComponent } from './pages/register-academic-information/register-academic-information.component';
import { RegisterMedicalInformationComponent } from './pages/register-medical-information/register-medical-information.component';
import { RegisterDevelopmentAreasComponent } from './pages/register-development-areas/register-development-areas.component';
import { RegisterProgrammingLanguagesComponent } from './pages/register-programming-languages/register-programming-languages.component';
import { RegisterFrameworksComponent } from './pages/register-frameworks/register-frameworks.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'register',
        children: [
          { path: 'new-basic-information', component: RegisterBasicInformationComponent },
          { path: 'new-identity-documentation', component: RegisterIdentityDocumentationComponent },
          { path: 'new-academy-information', component: RegisterAcademicInformationComponent },
          { path: 'new-medical-information', component: RegisterMedicalInformationComponent },
          { path: 'new-development-area', component: RegisterDevelopmentAreasComponent },
          { path: 'new-programming-language', component: RegisterProgrammingLanguagesComponent },
          { path: 'new-frameworks', component: RegisterFrameworksComponent },
          { path: '**', redirectTo: 'new-basic-information' }
        ] 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
