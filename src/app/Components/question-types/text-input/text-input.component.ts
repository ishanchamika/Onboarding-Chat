import { Component } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';

@Component({
  standalone: false,
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent extends BaseQuestionComponent 
{
  value: string = '';
  
  onSubmit(): void 
  {
    if (this.value.trim())
    {
      this.submitAnswer(this.value);
      this.value = '';
    }
  }
}