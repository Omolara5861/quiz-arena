import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { QuestionsComponent } from './questions/questions.component';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {
  
  @Input() isCorrect: Boolean = false;
  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('click') answer() {
<<<<<<< HEAD
    if (this.isCorrect && !QuestionsComponent.hasAnswered) {
=======
    if (this.isCorrect && !QuestionsComponent.hasAnswered ) {
>>>>>>> 51ae7d380dd5fc8a30f37c69632e004c2f8808f7
      this.render.setStyle(this.el.nativeElement, 'background', 'darkGreen');
      this.render.setStyle(this.el.nativeElement, 'color', 'white');
    }
    else if(!QuestionsComponent.hasAnswered) {
      this.render.setStyle(this.el.nativeElement, 'background', 'red');
      this.render.setStyle(this.el.nativeElement, 'color', 'white');
    }
  } 

}

