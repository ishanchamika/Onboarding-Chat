import { Component, OnInit } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { Option } from '../../../Models/conversation.model';

@Component({
  selector: 'app-checkbox-input',
  standalone: false,
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.css'
})
export class CheckboxInputComponent extends BaseQuestionComponent implements OnInit{
  selectedOptions: Option[] = [];

  ngOnInit(): void {
    if(!this.question.options || this.question.options.length === 0) {
      console.error('Checkbox input requires options');
    }
  }

  toggleOption(option: Option): void {
    const index = this.selectedOptions.indexOf(option);
    if(index > -1){
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
  }

  onSubmitButtonClicked(): void {
      if(this.selectedOptions.length>0) {
        this.submitAnswer(this.selectedOptions);
        this.selectedOptions = [];
      }
  }

  canSubmit(): boolean {
    return true;
  }
  

}
