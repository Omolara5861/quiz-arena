// This imports the necessary modules from Angular
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormControlName, Validators } from '@angular/forms';

// This component is responsible for the welcome screen of the app
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  // This creates a form group with a single form control for the user's name
  form = new FormGroup({
    user:new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+$')])
  })

  // This gets a reference to the name input field in the template
  @ViewChild('name')nameKey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  /** This method is called when the user clicks the start quiz button, it saves the user's name in local storage */
  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }

  /** This getter method returns the form control for the user's name */
  get user() {
    return this.form.get('user');
  }
}
