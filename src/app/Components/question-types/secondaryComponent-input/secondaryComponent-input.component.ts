import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { BaseQuestionComponent } from '../base-question.component';
import { Question, Option } from '../../../Models/conversation.model';
import { TextInputComponent } from '../text-input/text-input.component';
import { DropdownInputComponent } from '../dropdown-input/dropdown-input.component';
import { RadioInputComponent } from '../radio-input/radio-input.component';
import { ButtonsInputComponent } from '../buttons-input/buttons-input.component';
import { CalendarInputComponent } from '../calendar-input/calendar-input.component';

@Component({
  selector: 'app-address-input',
  standalone: false,
  templateUrl: './secondaryComponent-input.component.html',
  styleUrls: ['./secondaryComponent-input.component.css']
})
export class SecondaryComponentInputComponent extends BaseQuestionComponent implements OnInit {
  @ViewChildren('inputs') inputComponents!: QueryList<
  TextInputComponent | DropdownInputComponent | RadioInputComponent | CalendarInputComponent
  // any
  >;
  layoutColumns: number = 1;
  subQuestionRows: Question[][] = [];

  ngOnInit(): void {
    if (this.question && this.question.subQuestion) {
      this.layoutColumns = this.question.layoutColumn || 1;
      const rowQuestions = Object.values(this.question.subQuestion);
      this.subQuestionRows = this.groupIntoRows(rowQuestions, this.layoutColumns);
      console.log('inputComponents:', this.inputComponents);
    } else {
      console.error('Secondary input requires subQuestions');
    }
  }
  // ngAfterViewInit(): void {
  //   console.log('inputComponents after view init:', this.inputComponents.toArray());
  // }
  groupIntoRows(questions: Question[],columns: number): Question[][] {
    const rows: Question[][] = [];
    for (let i = 0; i < questions.length; i += columns) {
      rows.push(questions.slice(i, i + columns));
    }
    console.log('Grouped rows:', rows);
    return rows;
  }


//   private groupIntoTriples(questions: Question[]): Question[][] {
//     const rows: Question[][] = [];
//     for (let i = 0; i < questions.length; i += 3) {
//         rows.push(questions.slice(i, i + 3));
//     }
//     console.log(rows)
//     return rows;
    
// }

  // private groupIntoPairs(questions: Question[]): Question[][] {
  //   const rows: Question[][] = [];
  //   for (let i = 0; i < questions.length; i += 2) {
  //     const pair = [questions[i]];
  //     if (i + 1 < questions.length) {
  //       pair.push(questions[i + 1]);
  //     }
  //     rows.push(pair);
  //   }
  //   return rows;
  // }
  

  onSubmitButtonClicked(): void {
    // if (this.canSubmit()) {
    //   const addressParts = this.inputComponents.toArray().map(component => {
    //     if (component instanceof TextInputComponent) {
    //       return component.value || '';
    //     } else if (component instanceof DropdownInputComponent) {
    //       return component.selectedOption?.text || '';
    //     }
    //     return '';
    //   });

    //   const addressString = addressParts.join(', ');
    //   const addressObject = {
    //     streetName: addressParts[0],
    //     houseNumber: addressParts[1],
    //     city: addressParts[2],
    //     state: addressParts[3]
    //   };
    //   this.submitAnswer({ text: addressString, value: addressObject });
    // }
    if (this.canSubmit()) {
      const inputParts: string[] = [];
      const inputObject: { [key: string]: any } = {};

      this.inputComponents.toArray().forEach((component, index) => {
        const subQuestion = this.getSubQuestionByIndex(index);
        let value: any;

        // Extract value based on component type
        if (component instanceof TextInputComponent) {
          value = component.value || '';
        } else if (component instanceof DropdownInputComponent) {
          value = component.selectedOption?.text || '';
        } else if (component instanceof RadioInputComponent) {
          value = component.selectedOption?.text || ''; 
        } else if (component instanceof CalendarInputComponent) {
          const date = component.selectedDate;
          value = date ? date.toISOString().split('T')[0] : null;
        } else {
          value = ''; 
          console.warn(`Unrecognized input type for subQuestion: ${subQuestion.questionId}`);
        }

        //text representation
        inputParts.push(String(value));

        //questionId as key in the output object
        inputObject[subQuestion.questionId] = value;
      });

      const inputString = inputParts.join(', ');
      this.submitAnswer({ text: inputString, value: inputObject });
    }
  }
  getSubQuestionByIndex(index: number): Question {
    let count = 0;
    for(const row of this.subQuestionRows){
      for(const subQuestion of row){
        if(count === index){
          return subQuestion;
        }
        count++;
      }
    }
    throw new Error(`SubQuestion index not found : ${index}`);  
  }

  canSubmit(): boolean 
  {
    if(!this.inputComponents) 
      {
        console.log('inputComponents not initialized');
        return false;
      }
      const valid = this.inputComponents.toArray().every((component, index) => 
      {
        console.log('rrr',this.inputComponents);
  
        if(component instanceof TextInputComponent) 
        { 
          if(component.validationRule?.pattern)
          {
            return component.validationRule?.pattern.test(component.value);
          }
          else
          {
            console.log('Not validation key found from validation rules');
            return false;
          }
        } 
        else if(component instanceof DropdownInputComponent) 
        {
          const valid = component.question.validation?.required ? !!component.selectedOption : true;
          return valid;
        }
        else if(component instanceof CalendarInputComponent)
        {
          const valid = component.question.validation?.required ? !!component.selectedDate : true;
          return valid;
        }
        else if(component instanceof RadioInputComponent)
        {
          const valid = component.question.validation?.required ? !!component.selectedOption : true;
          return valid;
        }
        return true;
      });
      return valid;

  }

}