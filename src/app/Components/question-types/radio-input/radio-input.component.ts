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
    if (!this.question.options || this.question.options.length === 0) {
      console.error('Radio input requires options but none were provided');
    }
  }
  
  selectOption(option: Option): void {
    this.selectedOption = option;
  }
  
  onSubmitButtonClicked(): void {
    if (this.selectedOption) {
      const answer = { text: this.selectedOption, value: this.selectedOption, type:'radio', currentQID: this.question.questionId, nextQuestionId: this.question.nextQuestionId };
      this.submitAnswer(answer);
      this.selectedOption = null;
    }
  }

  canSubmit(): boolean {
    return !!this.selectedOption;
  }
}