import {  Component, Input, OnInit } from '@angular/core';
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
  validationRule?: ValidationRule;
  validRule: Boolean = true;

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
      const answer = { text: this.value, value: this.value, type:'input', currentQID: this.question.questionId, nextQuestionId: this.question.nextQuestionId};
      this.submitAnswer(answer);
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
      this.validRule = this.validationRule.pattern.test(this.value);
      if(!this.validRule)
      {
        return false;
      }
    }
    if(this.question.validation !== null && this.question.validation?.required === true)
    {
      const getValue = Number(this.value);
      const max = Number(this.question.validation.max) || Infinity;
      const min = Number(this.question.validation.min) || 0;
      if(this.validRule && getValue <= max && getValue >= min)
      {
        return true;
      }
      else
      {
        return false;
      }
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