import {  Component, Input, OnInit } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { ValidationRules, ValidationRule } from '../../validation-rules/validation-rules';

@Component({
  standalone: false,
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent extends BaseQuestionComponent implements OnInit
{
  value: string = '';
  validationRule?: ValidationRule;

  ngOnInit(): void {
    // Suppose your question object has a field like: { validationKey: 'identityNumber' }
    const key = this.question?.validationKey;
    if (key && ValidationRules[key]) {
      this.validationRule = ValidationRules[key];
    }
  }

  onSubmitButtonClicked(): void 
  {
    if(this.canSubmit()) 
    {
      this.submitAnswer(this.value);
      this.value = '';
    }
  }

  get isValid(): boolean 
  {
    if(!this.value.trim())
    {
      return false;
    } 
    if(this.validationRule) 
    {
      return this.validationRule.pattern.test(this.value);
    }
    return true;
  }

  canSubmit(): boolean 
  {
    if(this.isValid)
    {
      return true;
    }
    return false;
    // return this.question.validation?.required ? !!this.value.trim() : true;  
  }
}