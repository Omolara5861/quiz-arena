import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { QuestionsComponent } from './questions/questions.component';

@Directive({
  selector: '[appChangeBg]' // Selector used to apply the directive
})
export class ChangeBgDirective {

  @Input() isCorrect: Boolean = false; // Input property that determines whether the answer is correct or not
  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('click') answer() { // Host listener that listens for a click event
    if (this.isCorrect && !QuestionsComponent.hasAnswered ) { // Condition to check if the answer is correct and has not been answered yet
      this.render.addClass(this.el.nativeElement, 'correct'); // Adds 'correct' class to the element
    }
    else if(!QuestionsComponent.hasAnswered) { // Condition to check if the answer has not been answered yet
      this.render.addClass(this.el.nativeElement, 'incorrect') // Adds 'incorrect' class to the element
    }
  }

}