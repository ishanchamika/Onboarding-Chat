import { Component, OnInit } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';

@Component({
  selector: 'app-calendar-input',
  standalone: false,
  templateUrl: './calendar-input.component.html',
  styleUrls: ['./calendar-input.component.css']
})
export class CalendarInputComponent extends BaseQuestionComponent implements OnInit {
  selectedDate: Date | null = null;
  minDate!: Date | null;
  maxDate!: Date | null;
  misvalidatedmsg: string = '';
  touched: boolean = false;

  ngOnInit(): void 
  {
    if(this.question?.minDate) 
    {
      this.minDate = new Date(this.question.minDate);
    }

    if(this.question?.maxDate) 
    {
      this.maxDate = new Date(this.question.maxDate);
    }

    if(!this.minDate || !this.maxDate) 
    {
      const today = new Date();
      // this.minDate ??= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      // this.maxDate ??= new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
      this.minDate = null;
      this.maxDate = null;
    }
  }

  onDateSelected(date: Date): void 
  {
    this.touched = true;
    this.selectedDate = date;
  }
  
  canSubmit(): boolean 
  {
    if(!this.selectedDate && this.question.validation?.required)
    { 
        this.misvalidatedmsg = 'Date is required';
        return false;
    } 
    else if(!this.selectedDate && !this.question.validation?.required)
    {
      this.misvalidatedmsg = '';
      return true;
    }
    else if(this.selectedDate && !this.question.validation?.required)
    {
      return this.checkMinAndMaxDateValidation();
    }
    else if(this.selectedDate && this.question.validation?.required)
    {
      return this.checkMinAndMaxDateValidation();
    }
    else
    {
      return true;
    }
  }


  checkMinAndMaxDateValidation(): boolean
  {
    if(!this.selectedDate || !(this.selectedDate instanceof Date) || isNaN(this.selectedDate.getTime()))
    {
      this.misvalidatedmsg = 'Enter a valid date';
      return false;
    }

    const selected = this.toDateOnly(this.selectedDate);
    const min = this.minDate ? this.toDateOnly(this.minDate) : null;
    const max = this.maxDate ? this.toDateOnly(this.maxDate) : null;


    const minFormatted = min ? this.formatDateToYMD(min) : '';
    const maxFormatted = max ? this.formatDateToYMD(max) : '';

    const isAfterMin = !min || selected.getTime() >= min.getTime();  //If min is null, set true
    const isBeforeMax = !max || selected.getTime() <= max.getTime();
  
    if(!isAfterMin)
    {
      this.misvalidatedmsg = `Minimum Date should be ${minFormatted}`;
    }
    if(!isBeforeMax)
    {
      this.misvalidatedmsg = `Maximum Date should be ${maxFormatted}`;
    }
    return isAfterMin && isBeforeMax;
  }

  toDateOnly(date: Date): Date 
  {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  formatDateToYMD(date: Date): string 
  {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  
  onSubmitButtonClicked(): void 
  {
    if(this.canSubmit()) 
    {
      const answer = { text: this.selectedDate, value: this.selectedDate, type:'calender', currentQID: this.question.questionId, nextQuestionId: this.question.nextQuestionId };
      this.submitAnswer(answer);
      this.selectedDate = null;
    }
  }

  getValidationMsg(): string
  {
    return this.misvalidatedmsg;
  }

  onTouched(): void {
    this.touched = true;
  }
}