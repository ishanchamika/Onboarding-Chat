import { Component } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';

@Component({
  selector: 'app-number-input',
  standalone: false,
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent extends BaseQuestionComponent 
{
  value: number | null = null;
  
  onSubmit(): void 
  {
    if(this.value !== null) 
    {
      this.submitAnswer(this.value);
      this.value = null;
    }
  }
}