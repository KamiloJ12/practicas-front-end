import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegiterStudentComponent } from './pages/regiter-student/regiter-student.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'register', component: RegiterStudentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
