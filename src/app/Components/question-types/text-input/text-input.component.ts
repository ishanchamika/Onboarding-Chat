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
    if(this.question.validation?.required && (this.question.validation?.max || this.question.validation?.min))
    {
      const getValue = Number(this.value);
      const max = Number(this.question.validation?.max) || Infinity;
      const min = Number(this.question.validation?.min) || 0;

      if(getValue <= max && getValue >= min)
      {
        return true;
      }
      else
      {
        this.misvalidatedmsg = `Input range should between ${min} and ${max} `;
        return false;
      }
    }
    if(this.question.validation?.pattern && !this.question.validation.required)
    {
      const key = this.question?.validation?.pattern;

      if(key && ValidationRules[key])
      {
        this.validationRule = ValidationRules[key];
        if(this.value)
        {
          const valid = this.validationRule?.pattern.test(this.value);
          if(!valid){ 
            this.misvalidatedmsg = this.validationRule.message;
          }
          return valid;
        }
        else
        {
          this.misvalidatedmsg = '';
          return true;
        }
      }
      else if(key && !ValidationRules[key])
      {
        console.warn("Validation pattern Not Found");
        return false;
      }
    }
    else if(this.question.validation?.pattern && this.question.validation.required)
    {
      const key = this.question?.validation?.pattern;

      if(key && ValidationRules[key])
      {
        this.validationRule = ValidationRules[key];
        if(this.value)
        {
          const valid = this.validationRule?.pattern.test(this.value);
          if(!valid){ 
            this.misvalidatedmsg = this.validationRule.message;
          }
          return valid;
        }
        else
        {
          this.misvalidatedmsg = "required field";
          return false;
        }
      }
      else if(key && !ValidationRules[key])
      {
        console.warn("Validation pattern Not Found");
        return false;
      }
    }
    else if((this.question.validation?.required) && !(this.question.validation?.pattern))
    {
      if(this.value)
      {
        return true;
      }
      else
      {
        this.misvalidatedmsg = "required field";
        return false;
      }
    }
    else
    {
      return true;
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