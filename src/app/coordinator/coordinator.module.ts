import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemsComponent } from './components/sidebar-items/sidebar-items.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { StudentsComponent } from './pages/students/students.component';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    SidebarItemsComponent,
    SidebarItemComponent,
    StudentsComponent,
  ],
  imports: [
    CommonModule,
    CoordinatorRoutingModule,
    PrimeNgModule
  ]
})
export class CoordinatorModule { }
