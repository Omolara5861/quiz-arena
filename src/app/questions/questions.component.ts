import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  // Variables needed to run the app
  name: string = '';
  questionList: any = [];
  currentQuestion: number = 0;
  points: number = 0;
  timer: number = 60;
  correctAns: number = 0;
  inCorrectAns: number = 0;
  interval$:any;
  progresswidth:string = "0";
  completedQuiz: boolean = false;  
  lastQuestion: boolean = false;
  nextBtnClicked: boolean = false;
  static hasAnswered: Boolean = false;
  

  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    // Getting the name of the player
    this.name = localStorage.getItem('name')!;
    // loading all the questions on page load
    this.getAllQuestions();
    // Immediately starting the timer on page load
    this.startTimer();
  
  }

  // getting the question from the service and subscribing to it immediately
  getAllQuestions() {
    this.questionService.getQuestion()
    .subscribe(
      (res) => {
      this.questionList = res.questions;
      console.log(res);
    }) 
  }

  // Calculating the progress bar width based on the question the player is answering
  getProgressWidth() {
    this.progresswidth = ((this.currentQuestion/this.questionList.length) * 100).toString();
    return this.progresswidth;
  }


  nextQuestion() {
    this.currentQuestion++;
    // disabling to the next button if no option is selected
    this.nextBtnClicked = false;
    this.resetTimer();
    QuestionsComponent.hasAnswered = false;
  }

  prevQuestion() {
    this.currentQuestion--;
  }

  answer(questionNo:number, questionOpt:any) {

    // Stopping the player from selecting multiple answers 
    if(QuestionsComponent.hasAnswered) {
        return;
      }
    QuestionsComponent.hasAnswered = true;

    // enabling the next button if an option is selected
    if(questionOpt) {
        this.nextBtnClicked = true;
  
        
      if(questionNo === this.questionList.length) {
          this.lastQuestion = true;
      }
  
      if(questionOpt.correct) {
        this.points += 10;
        setTimeout( () => {
          // this.currentQuestion++;
          this.correctAns++;
          this.getProgressWidth();
          this.resetTimer();
        }, 1000);
  
      }
      else {
        setTimeout(() => {
        // this.currentQuestion++;
        this.inCorrectAns++;
        this.getProgressWidth()
        this.resetTimer();
        }, 1000)
      }
    }

  }

  startTimer() {
    this.interval$ = interval(1000)
    .subscribe(val => {
      this.timer--;
      if(this.timer === 0) {
        this.currentQuestion++;
        this.inCorrectAns++;
      }
    });
    setTimeout(() => {
        this.interval$.unsubscribe();
    }, 60000)
  }

  stopTimer() {
    this.interval$.unsubscribe();
    this.timer = 0;
  }

  resetTimer() {
    this.stopTimer();
    this.timer = 60;
    this.startTimer();
  }

  resetQuiz() {
    this.completedQuiz = false;
    this.resetTimer();
    this.getAllQuestions();
    this.points = 0;
    this.correctAns = 0;
    this.inCorrectAns = 0;
    this.currentQuestion = 0;
    this.lastQuestion = false;
    this.progresswidth = "0";
    this.nextBtnClicked = false;
    QuestionsComponent.hasAnswered = false;
  }

  viewResult() {
    this.completedQuiz = true;
  }

 
}