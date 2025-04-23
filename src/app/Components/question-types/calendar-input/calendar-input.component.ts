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
  minDate!: Date;
  maxDate!: Date;

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
      this.minDate ??= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      this.maxDate ??= new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    }
  }

  onDateSelected(date: Date): void 
  {
    this.selectedDate = date;
  }
  
  canSubmit(): boolean 
  {
    if(!this.selectedDate)
    { 
      return false;
    } 
    const selected = this.toDateOnly(this.selectedDate);
    const min = this.minDate ? this.toDateOnly(this.minDate) : null;
    const max = this.maxDate ? this.toDateOnly(this.maxDate) : null;

    const afterMin = !min || selected.getTime() >= min.getTime();
    const beforeMax = !max || selected.getTime() <= max.getTime();

    return afterMin && beforeMax;
  }


  toDateOnly(date: Date): Date 
  {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  
  onSubmitButtonClicked(): void 
  {
    if(this.canSubmit()) 
    {
      this.submitAnswer(this.selectedDate);
      this.selectedDate = null;
    }
  }

}