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

  ngOnInit(): void {
    
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    const formattedDate = date.toISOString().split('T')[0]; 
    this.submitAnswer(formattedDate);
  }

  onSubmitButtonClicked(): void {
    
  }

  canSubmit(): boolean {
    return false; 
  }
}