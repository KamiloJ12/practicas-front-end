import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorLabelDirective } from './directives/error-label.directive';


@NgModule({
  declarations: [
    ErrorLabelDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorLabelDirective,
  ]
})
export class SharedModule { }