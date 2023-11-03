import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { ErrorLabelDirective } from './directives/error-label.directive';

import { CapitalizeSentencesPipe } from './pipes/capitalize-sentences.pipe';
import { FileInputComponent } from './components/file-input/file-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [
    ErrorLabelDirective,
    LogoComponent,
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
    CapitalizeSentencesPipe,
    SearchBoxComponent,
    FileInputComponent,
  ]
})
export class SharedModule { }