import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormControlName, Validators } from '@angular/forms';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  form = new FormGroup({
    user:new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+$')])
  })

  @ViewChild('name')nameKey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }

  get user() {
    return this.form.get('user');
    
  }
}
