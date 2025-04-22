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
  
  onSubmitButtonClicked(): void {
    if (this.canSubmit()) {
      this.submitAnswer(this.value);
      this.value = null;
    }
  }

  canSubmit(): boolean {
    if (!this.value) return false;
    if (this.question.validation?.required && !this.value) return false;
    if (this.question.validation?.min && this.value < this.question.validation.min) return false;
    if (this.question.validation?.max && this.value > this.question.validation.max) return false;
    return true;
  }
}