import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { StudentsComponent } from './pages/students/students.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    StudentsComponent,
  ],
  imports: [
    CommonModule,
    CoordinatorRoutingModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class CoordinatorModule { }
