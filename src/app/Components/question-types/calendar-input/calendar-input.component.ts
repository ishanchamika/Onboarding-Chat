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
    // Initialization logic if needed
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.submitAnswer(date); // Submit the selected date as the answer
  }
}