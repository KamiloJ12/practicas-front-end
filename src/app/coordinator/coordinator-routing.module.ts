import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
        { path: 'students', component: StudentsComponent },
        { path: 'countries', component: CountriesPageComponent },
        { path: '**', redirectTo: 'students' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorRoutingModule { }