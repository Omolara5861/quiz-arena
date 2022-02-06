import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { QuestionsComponent } from './questions/questions.component';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {
  
  @Input() isCorrect: Boolean = false;
  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('click') answer() {
    if (this.isCorrect && !QuestionsComponent.hasAnswered ) {
      this.render.setStyle(this.el.nativeElement, 'background', 'darkGreen');
      this.render.setStyle(this.el.nativeElement, 'color', 'white');
    }
    else if(!QuestionsComponent.hasAnswered) {
      this.render.setStyle(this.el.nativeElement, 'background', 'red');
      this.render.setStyle(this.el.nativeElement, 'color', 'white');
    }
  } 

}

