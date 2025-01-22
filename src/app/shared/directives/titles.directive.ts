import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitles]',
  standalone: false
})
export class TitlesDirective {

  constructor(private elementRef: ElementRef) { 
    console.log(this.elementRef)
    this.elementRef.nativeElement.style.fontSize = '20px';
  }

}
