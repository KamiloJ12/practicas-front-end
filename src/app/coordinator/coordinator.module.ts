import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';

import { CoordinatorLayoutComponent } from './layout/coordinator-layout/coordinator-layout.component';
import { StudentsPageComponent } from './pages/students-page/students-page.component';

@NgModule({
  declarations: [
    CoordinatorLayoutComponent,
    StudentsPageComponent,
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
