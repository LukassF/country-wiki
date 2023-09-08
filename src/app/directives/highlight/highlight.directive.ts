import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  isFocused: boolean = false;
  @Input() appHighlight: any;

  isMouseDown: boolean = false;

  constructor(private el: ElementRef) {
    this.highlight('rgb(229, 229, 229)');
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.isFocused) this.highlight('rgb(223, 5, 252)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.isFocused) this.highlight('rgb(229, 229, 229)');
  }

  @HostListener('focus') onFocus() {
    this.isFocused = true;
    this.highlight('rgb(0, 255, 148)');
  }

  @HostListener('blur') onBlur() {
    this.isFocused = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.highlight(
      this.isFocused
        ? 'rgb(0, 255, 148)'
        : changes['appHighlight'].currentValue
        ? 'rgb(229, 229, 229)'
        : 'rgb(229, 229, 229)'
    );
  }

  private highlight(color: string) {
    this.el.nativeElement.style.fill = color;
  }
}
