import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoordinatorLayoutComponent } from './layout/coordinator-layout/coordinator-layout.component';
import { StudentsPageComponent } from './pages/students-page/students-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoordinatorLayoutComponent,
    children: [
        { path: 'students', component: StudentsPageComponent },
        { path: 'student/:id', component: StudentPageComponent },
        { path: '**', redirectTo: 'students' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorRoutingModule { }