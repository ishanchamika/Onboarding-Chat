import { Component, OnInit } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { Option } from '../../../Models/conversation.model';

@Component({
  selector: 'app-buttons-input',
  standalone: false,
  templateUrl: './buttons-input.component.html',
  styleUrls: ['./buttons-input.component.css']
})
export class ButtonsInputComponent extends BaseQuestionComponent implements OnInit {
  
  ngOnInit(): void {
    // Ensure options exist
    if (!this.question.options || this.question.options.length === 0) {
      console.error('Buttons input requires options but none were provided');
    }
  }
  
  selectOption(option: Option): void {
    this.submitAnswer(option);
  }

  onSubmitButtonClicked(): void {
    // Not used since buttons submit directly
  }

  canSubmit(): boolean {
    return false; // Submit button not shown
  }
}
