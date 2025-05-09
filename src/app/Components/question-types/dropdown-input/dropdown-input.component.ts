import { Component, OnInit } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { Option } from '../../../Models/conversation.model';

@Component({
  selector: 'app-dropdown-input',
  standalone: false,
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.css']
})
export class DropdownInputComponent extends BaseQuestionComponent implements OnInit {
  selectedOption: Option | null = null;
  
  ngOnInit(): void {
    if (!this.question.options || this.question.options.length === 0) {
      console.error('Dropdown input requires options but none were provided');
    }
  }
  
  onSelectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const index = parseInt(select.value, 10);
    if (!isNaN(index) && this.question.options && index >= 0 && index < this.question.options.length) {
      this.selectedOption = this.question.options[index];
    } else {
      this.selectedOption = null;
    }
  }
  
  onSubmitButtonClicked(): void {
    if (this.selectedOption) {
      const answer = { text: this.selectedOption, value: this.selectedOption, type:'dropdown', currentQID: this.question.questionId, nextQuestionId: this.question.nextQuestionId };
      this.submitAnswer(answer);
      this.selectedOption = null;
    }
  }

  canSubmit(): boolean {
    if(this.selectedOption)
    {
      return true;
    } 
    return false;
    // return !!this.selectedOption;
  }
}