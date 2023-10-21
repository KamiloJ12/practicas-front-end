import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { StudentsComponent } from './pages/students/students.component';
import { SharedModule } from '../shared/shared.module';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentsPageComponent } from './pages/departments-page/departments-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    StudentsComponent,
    CountriesPageComponent,
    DepartmentsPageComponent,
  ],
  imports: [
    CommonModule,
    CoordinatorRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoordinatorModule { }
