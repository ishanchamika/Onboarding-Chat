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
  mincheck!: number;
  maxcheck!: number;
  dbMax!: number;
  dbMin!: number;
  selectedCount!: number;
  
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
    if(this.canSubmit()) 
    {
      const answer = { text: this.selectedOptions.map(opt => opt.text).join(', '), value: this.selectedOptions, type:'checkbox', currentQID: this.question.questionId, nextQuestionId: this.question.nextQuestionId };
      this.submitAnswer(answer);
      this.selectedOptions = [];
    }
  }

canSubmit(): boolean {
  this.dbMax = Number(this.question?.maxcheck) || Infinity;
  this.dbMin = Number(this.question?.mincheck) || 0;

  const selectedCount = this.selectedOptions.length;

  if(selectedCount >= this.dbMin && selectedCount <= this.dbMax)
  {
    console.log('aaa', selectedCount);
    console.log('Min', this.dbMin);
    console.log('Max', this.dbMax);
    return true;
  }
  return false;
}


  

}
