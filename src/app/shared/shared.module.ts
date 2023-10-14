import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorLabelDirective } from './directives/error-label.directive';
import { LogoComponent } from './components/logo/logo.component';


@NgModule({
  declarations: [
    ErrorLabelDirective,
    LogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorLabelDirective,
    LogoComponent
  ]
})
export class SharedModule { }