import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorLabelDirective } from './directives/error-label.directive';
import { LogoComponent } from './components/logo/logo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { SidebarItemsComponent } from './components/sidebar-items/sidebar-items.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ErrorLabelDirective,
    LogoComponent,
    SidebarComponent,
    SidebarItemsComponent,
    SidebarItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ErrorLabelDirective,
    LogoComponent,
    SidebarComponent
  ]
})
export class SharedModule { }