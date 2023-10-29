import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { ErrorLabelDirective } from './directives/error-label.directive';

import { CapitalizeSentencesPipe } from './pipes/capitalize-sentences.pipe';
import { FileInputComponent } from './components/file-input/file-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { SidebarItemsComponent } from './components/sidebar-items/sidebar-items.component';

@NgModule({
  declarations: [
    ErrorLabelDirective,
    LogoComponent,
    SidebarComponent,
    SidebarItemsComponent,
    SidebarItemComponent,
    CapitalizeSentencesPipe,
    SearchBoxComponent,
    FileInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimeNgModule,
  ],
  exports: [
    ErrorLabelDirective,
    LogoComponent,
    SidebarComponent,
    CapitalizeSentencesPipe,
    SearchBoxComponent,
    FileInputComponent,
  ]
})
export class SharedModule { }