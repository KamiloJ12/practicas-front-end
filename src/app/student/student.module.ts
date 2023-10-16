import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { RegiterStudentComponent } from './pages/regiter-student/regiter-student.component';
import { BasicPersonalInformationComponent } from './components/basic-personal-information/basic-personal-information.component';
import { AcademicInformationComponent } from './components/academic-information/academic-information.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NavigationFormStepsComponent } from './components/navigation-form-steps/navigation-form-steps.component';
import { IdentityInformationComponent } from './components/identity-information/identity-information.component';
import { MedicalInformationComponent } from './components/medical-information/medical-information.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ProgrammingLanguagesComponent } from './components/programming-languages/programming-languages.component';
import { FrameworksComponent } from './components/frameworks/frameworks.component';


@NgModule({
  declarations: [
    RegiterStudentComponent,
    BasicPersonalInformationComponent,
    AcademicInformationComponent,
    NavigationFormStepsComponent,
    IdentityInformationComponent,
    MedicalInformationComponent,
    PreferencesComponent,
    ProgrammingLanguagesComponent,
    FrameworksComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StudentModule {
}
