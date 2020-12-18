import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[noCheck]',
})
export class NoRightClickDirective {

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  constructor() { }

}