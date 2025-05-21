import {  Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { ValidationRules, ValidationRule } from '../../validation-rules/validation-rules';
import { NgModel } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent extends BaseQuestionComponent
{
  @ViewChild('inputRef', { static: false }) inputRef!: NgModel;
  value: string = '';
  validationRule?: ValidationRule;
  validRule: Boolean = true;
  misvalidatedmsg: string = '';

  ngOnInit(): void {
    // Suppose your question object has a field like: { validationKey: 'identityNumber' }
    const key = this.question?.validation?.pattern;
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
      this.misvalidatedmsg = 'This is required';
      return false;
    } 
    if(this.validationRule) 
    {
      this.validRule = this.validationRule.pattern.test(this.value);
      if(!this.validRule)
      {
        this.misvalidatedmsg = this.validationRule.message;
        return false;
      }
    }
    if(this.question.validation !== null && this.question.validation?.required === true && (this.question.validation?.max || this.question.validation?.min))
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
        this.misvalidatedmsg = `Input range should between ${this.question.validation.max} and ${this.question.validation.min} `;
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

  getValidationMsg(): string
  {
    console.log('this_misvalidatedmsg', this.misvalidatedmsg);
    return this.misvalidatedmsg;
  }
}