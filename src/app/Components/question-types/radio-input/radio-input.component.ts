import { Component, OnInit } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { Option } from '../../../Models/conversation.model';

@Component({
  selector: 'app-radio-input',
  standalone: false,
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.css']
})
export class RadioInputComponent extends BaseQuestionComponent implements OnInit {
  selectedOption: Option | null = null;
  
  ngOnInit(): void {
    // Ensure options exist
    if (!this.question.options || this.question.options.length === 0) {
      console.error('Radio input requires options but none were provided');
    }
  }
  
  selectOption(option: Option): void {
    this.selectedOption = option;
  }
  
  onSubmitButtonClicked(): void {
    if (this.selectedOption) {
      this.submitAnswer(this.selectedOption);
      this.selectedOption = null; // Reset after submission
    }
  }

  canSubmit(): boolean {
    return !!this.selectedOption;
  }
}