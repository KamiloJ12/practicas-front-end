import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { StudentsComponent } from './pages/students/students.component';
import { SharedModule } from '../shared/shared.module';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    StudentsComponent,
    CountriesPageComponent,
  ],
  imports: [
    CommonModule,
    CoordinatorRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
  ]
})
export class CoordinatorModule { }
