import { Component, Input, OnInit } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { ValidationRules, ValidationRule } from '../../validation-rules/validation-rules';

@Component({
  standalone: false,
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent extends BaseQuestionComponent
{
  value: string = '';
  
  onSubmitButtonClicked(): void {
    if (this.canSubmit()) {
      this.submitAnswer(this.value);
      this.value = ''; // Reset after submission
    }
  }

  canSubmit(): boolean {
    return this.question.validation?.required ? !!this.value.trim() : true;
  }
}