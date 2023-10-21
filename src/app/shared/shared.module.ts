import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorLabelDirective } from './directives/error-label.directive';
import { LogoComponent } from './components/logo/logo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { SidebarItemsComponent } from './components/sidebar-items/sidebar-items.component';
import { RouterModule } from '@angular/router';
import { CapitalizeSentencesPipe } from './pipes/capitalize-sentences.pipe';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    ErrorLabelDirective,
    LogoComponent,
    SidebarComponent,
    SidebarItemsComponent,
    SidebarItemComponent,
    CapitalizeSentencesPipe,
    SearchBoxComponent,
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
  ]
})
export class SharedModule { }