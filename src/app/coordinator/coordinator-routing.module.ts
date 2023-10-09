import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
        { path: 'students', component: StudentsComponent },
        { path: '**', redirectTo: 'students' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorRoutingModule { }