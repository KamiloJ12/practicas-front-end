import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { RegiterStudentComponent } from './pages/regiter-student/regiter-student.component';
import { BasicPersonalInformationComponent } from './components/basic-personal-information/basic-personal-information.component';
import { AcademicInformationComponent } from './components/academic-information/academic-information.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegiterStudentComponent,
    BasicPersonalInformationComponent,
    AcademicInformationComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ]
})
export class StudentModule {
}
