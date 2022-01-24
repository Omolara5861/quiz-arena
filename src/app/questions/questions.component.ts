import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  name: string = '';
  questionList: any = [];
  currentQuestion: number = 0;
  points: number = 0;
  pointsMoreThan1: boolean = true;
  timer: number = 60;
  correctAns: number = 0;
  inCorrectAns: number = 0;
  interval$:any;
  progresswidth:string = "0";
  completedQuiz: boolean = false;  
  lastQuestion: boolean = false;
  nextBtnClicked: boolean = false;
  

  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startTimer();
  
  }

  getAllQuestions() {
    this.questionService.getQuestion()
    .subscribe(
      (res) => {
      this.questionList = res.questions;
      console.log(res);
    }) 
  }

  getProgressWidth() {
    this.progresswidth = ((this.currentQuestion/this.questionList.length) * 100).toString();
    return this.progresswidth;
  }

  nextQuestion() {
    this.currentQuestion++;
    this.nextBtnClicked = false;
    this.resetTimer();
  }

  prevQuestion() {
    this.currentQuestion--;
  }

  answer(questionNo:number, questionOpt:any) {
    console.log("this is option: " , questionOpt);
    if(questionOpt) {
        this.nextBtnClicked = true;

        if(this.points === 0) {
          this.pointsMoreThan1 = false;
      }
  
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
  }

  viewResult() {
    this.completedQuiz = true;
  }

 
}

