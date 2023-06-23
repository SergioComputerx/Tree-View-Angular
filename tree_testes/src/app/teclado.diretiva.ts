import { HttpClient } from '@angular/common/http';
import { Component, Directive, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[focoDiretiva]'
})
export class FocoDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click')
  onClick() {
    this.el.nativeElement.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const currentRow = this.el.nativeElement;
    let targetRow: HTMLElement;
    targetRow = currentRow;

    if (event.key === 'ArrowDown') {
      targetRow = currentRow.nextElementSibling as HTMLElement;
    } else if (event.key === 'ArrowUp') {
      targetRow = currentRow.previousElementSibling as HTMLElement;
    }

    if (targetRow) {
      event.preventDefault();
      targetRow.focus();
    }
  }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
  }
}