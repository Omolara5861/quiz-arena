import { Component, OnInit } from '@angular/core';
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
  timer: number = 60;
  correctAns: number = 0;
  inCorrectAns: number = 0;


  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestion()
    .subscribe(
      (res) => {
      this.questionList = res.questions;
    }) 
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  prevQuestion() {
    this.currentQuestion--;
  }

  answer(questionNo:number, questionOpt:any) {
    if(questionOpt.correct) {
      this.points += 10;
      this.correctAns++;
      this.currentQuestion++;
    }
    else {
      this.points -= 10;
      this.inCorrectAns++;
      this.currentQuestion++;
    }
  }
}
