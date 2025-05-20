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
  misvalidatedmsg: string = '';
  ngOnInit(): void {
    if (!this.question.options || this.question.options.length === 0) {
      console.error('Buttons input requires options but none were provided');
    }
  }
  
  selectOption(option: Option): void {

    const answer = { text: option, value: option, type:'button', currentQID: this.question.questionId, nextQuestionId: this.question.nextQuestionId };
    this.submitAnswer(answer);
  }

  onSubmitButtonClicked(): void {
   
  }

  canSubmit(): boolean {
    return false; 
  }

  getValidationMsg(): string
  {
    return this.misvalidatedmsg;
  }
}
