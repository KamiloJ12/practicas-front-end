import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegiterStudentComponent } from './pages/regiter-student/regiter-student.component';
import { BasicPersonalInformationComponent } from './components/basic-personal-information/basic-personal-information.component';
import { AcademicInformationComponent } from './components/academic-information/academic-information.component';
import { IdentityInformationComponent } from './components/identity-information/identity-information.component';
import { MedicalInformationComponent } from './components/medical-information/medical-information.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ProgrammingLanguagesComponent } from './components/programming-languages/programming-languages.component';
import { FrameworksComponent } from './components/frameworks/frameworks.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'register', 
        component: RegiterStudentComponent,
        children: [
          { path: 'basic-information', component: BasicPersonalInformationComponent },
          { path: 'academic-information', component: AcademicInformationComponent },
          { path: 'identity-information', component: IdentityInformationComponent },
          { path: 'medical-information', component: MedicalInformationComponent },
          { path: 'preferences', component: PreferencesComponent },
          { path: 'programming-languages', component: ProgrammingLanguagesComponent },
          { path: 'frameworks', component: FrameworksComponent },
          { path: '**', redirectTo: 'basic-information' }
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
