import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[fullscreen]'
})
export class FullscreenDirective {
    constructor(renderer: Renderer, el: ElementRef) {
      renderer.setElementClass(el.nativeElement, 'fullscreen', true);
    }
}