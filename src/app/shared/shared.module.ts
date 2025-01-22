import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitlesDirective } from './directives/titles.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    TitlesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    TitlesDirective
  ]
})
export class SharedModule { }
