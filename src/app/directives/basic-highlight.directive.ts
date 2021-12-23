import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  @Input() defaultColor = 'transparent';
  @HostBinding('style.backgroundColor') backgroundColor = this.defaultColor;
  @Input('appBasicHighlight') highlightColor = 'green';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.backgroundColor = 'red';
   }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

   @HostListener('mouseenter') mouseEnter(event: Event) {
     this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave(event: Event) {
    this.backgroundColor = this.defaultColor;
  }

}
