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
  pointsMoreThan1: Boolean = true;
  timer: number = 60;
  correctAns: number = 0;
  inCorrectAns: number = 0;
  interval$:any;
  progresswidth:string = "0";
  completedQuiz: Boolean = false;  
  

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
    }) 
  }

  getProgressWidth() {
    this.progresswidth = ((this.currentQuestion/this.questionList.length) * 100).toString();
    return this.progresswidth;
  }

  nextQuestion() {
    this.currentQuestion++;
    if(this.currentQuestion === this.questionList.length) {
      this.completedQuiz = true;
  }
  this.inCorrectAns++;
  }

  prevQuestion() {
    this.currentQuestion--;
  }

  answer(questionNo:number, questionOpt:any) {
    if(this.points === 0) {
        this.pointsMoreThan1 = false;
    }

    if(questionNo === this.questionList.length) {
        this.completedQuiz = true;
    }

    if(questionOpt.correct) {
      this.points += 10;
      setTimeout( () => {
        this.currentQuestion++;
        this.correctAns++;
        this.getProgressWidth();
        this.resetTimer();
      }, 1000);

    }
    else {
      setTimeout(() => {
      this.currentQuestion++;
      this.inCorrectAns++;
      this.getProgressWidth()
      this.resetTimer();
      }, 1000)
      this.points -= 10;
    }
  }

  startTimer() {
    this.interval$ = interval(1000)
    .subscribe(val => {
      this.timer--;
      if(this.timer === 0) {
        this.points -= 10;
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
    this.resetTimer();
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
  }
}

