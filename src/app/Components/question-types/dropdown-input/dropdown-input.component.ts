import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { Option } from '../../../Models/conversation.model';
import { ConversationService } from '../../../Services/conversation.service';

@Component({
  selector: 'app-dropdown-input',
  standalone: false,
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.css']
})
export class DropdownInputComponent extends BaseQuestionComponent implements OnInit {
  selectedOption: Option | null = null;
  misvalidatedmsg: string = '';
  currentSelections: Map<string, any> = new Map();
  @Output() selectionChanged = new EventEmitter<any>();

  constructor(conversationService: ConversationService) {
    super(conversationService);
  }


  async ngOnInit(): Promise<void> {
   if (this.question.optionsApi) {
      this.loadDynamicOptions();
    } else if (!this.question.options || this.question.options.length === 0) {
      console.error('Dropdown input requires options but none were provided');
    }
  }

  async loadDynamicOptions() : Promise<void> {
    if(!this.question.optionsApi) return;
    console.log("endpoint and params",this.question.optionsApi);
    const { endpoint, params } = this.question.optionsApi!;
    console.log('asd',endpoint);
    const paramValues : { [key:string]: string} = {};

    if (params && this.currentSelections) {
      for (const [paramName, questionId] of Object.entries(params)) {
        // const answerValue = this.conversationService.getAnswerValueForQuestion(questionId);
        const answerValue = this.currentSelections.get(questionId);
        console.log(`Retrieved value `, answerValue);
        if(answerValue && answerValue.value) {
          paramValues[paramName] = answerValue.value;
          console.log('asdasdasdasd',answerValue);
        } else {
          console.error(`No value found ${questionId}`);
          return;
        }
      }
    }
    try{
      const options = await this.conversationService.fetchOptions(endpoint, paramValues, this.question.nextQuestionId?? undefined);
      this.question.options = options;
    } catch (error) {
      console.error(`Error ${endpoint}`,error);
    }
    console.log('Current selections:', this.currentSelections);
  }
  
  onSelectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const index = parseInt(select.value, 10);
    if (!isNaN(index) && this.question.options && index >= 0 && index < this.question.options.length) {
      this.selectedOption = this.question.options[index];
      console.log('Emitting option:', this.selectedOption);
      this.selectionChanged.emit(this.selectedOption);
    } else {
      this.selectedOption = null;
      this.selectionChanged.emit(null);
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
  
  getValidationMsg(): string
  {
    return this.misvalidatedmsg;
  }
}