// Importing necessary modules
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
  name: string=''; // To store the name of the player
  questionList: any=[]; // To store the list of questions
  currentQuestion: number=0; // To store the index of the current question
  points: number=0; // To store the points scored by the player
  timer: number=60; // To store the remaining time to answer each question
  correctAns: number=0; // To store the number of correct answers
  inCorrectAns: number=0; // To store the number of incorrect answers
  interval$: any; // To store the interval object for the timer
  progresswidth: string="0"; // To store the width of the progress bar
  completedQuiz: boolean=false; // To store whether the quiz is completed or not
  lastQuestion: boolean=false; // To store whether the current question is the last question
  nextBtnClicked: boolean=false; // To store whether the Next button is clicked or not
  static hasAnswered: Boolean=false; // To store whether an answer is selected or not

  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    // Getting the name of the player
    this.name=localStorage.getItem('name')!;
    // loading all the questions on page load
    this.getAllQuestions();
    // Immediately starting the timer on page load
    this.startTimer();
  }

  // To get all the questions from the service and subscribing to it immediately
  getAllQuestions() {
    this.questionService.getQuestion()
      .subscribe(
        (res) => {
          this.questionList=res.questions;
          console.log(res);
        })
  }

  // To calculate the progress bar width based on the question the player is answering
  getProgressWidth() {
    this.progresswidth=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progresswidth;
  }

  // To go to the next question
  nextQuestion() {
    this.currentQuestion++;
    // disabling the Next button if no option is selected
    this.nextBtnClicked=false;
    this.resetTimer();
    QuestionsComponent.hasAnswered=false;
  }

  // To go to the previous question
  prevQuestion() {
    this.currentQuestion--;
  }

  // To handle the answer selected by the player
  answer(questionNo: number, questionOpt: any) {
    // Stopping the player from selecting multiple answers
    if (QuestionsComponent.hasAnswered) {
      return;
    }
    QuestionsComponent.hasAnswered=true;

    // enabling the Next button if an option is selected
    if (questionOpt) {
      this.nextBtnClicked=true;

      // Checking if the current question is the last question
      if (questionNo===this.questionList.length) {
        this.lastQuestion=true;
      }

      // If the selected option is correct, increase the score by 10a nd  increase the correct answer count
      if (questionOpt.correct) {
        this.points+=10;
        setTimeout(() => {
          this.correctAns++;
          // Update progress bar and reset timer for next question.
          this.getProgressWidth();
          this.resetTimer();
        }, 1000);

      }
      // If the answer is incorrect, update the incorrect answer count.
      else {
        setTimeout(() => {
          // this.currentQuestion++;
          this.inCorrectAns++;
          // Update progress bar and reset timer for next question.
          this.getProgressWidth()
          this.resetTimer();
        }, 1000)
      }
    }
  }

  /** This method starts a timer that counts down from 60 seconds, and  updates the current question and incorrect answer count if it reaches 0. */
  startTimer() {
    this.interval$=interval(1000)
      .subscribe(val => {
        this.timer--;
        if (this.timer===0) {
          this.currentQuestion++;
          this.inCorrectAns++;
        }
      });
      /** Unsubscribe from the timer after 60 seconds. */
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 60000)
  }

  /** This method stops the timer and resets the timer count to 0.*/
  stopTimer() {
    this.interval$.unsubscribe();
    this.timer=0;
  }

  /** This method resets the timer to 60 seconds and starts it again. */
  resetTimer() {
    this.stopTimer();
    this.timer = 60;
    this.startTimer();
  }

  /** This method resets the quiz to its initial state, clearing all stats, and fetching all questions again. */
  resetQuiz() {
    this.resetTimer();
    this.resetStats();
    this.getAllQuestions();
  }

  /** This method is called when the user has answered all questions and is ready to view their results. */
  viewResult() {
    this.completedQuiz=true;
  }

  /** This method resets all variable */
  resetStats(): void {
    this.completedQuiz=false;
    this.points=0;
    this.correctAns=0;
    this.inCorrectAns=0;
    this.currentQuestion=0;
    this.lastQuestion=false;
    this.progresswidth="0";
    this.nextBtnClicked=false;
    QuestionsComponent.hasAnswered=false;
    this.timer=60;
  }

}