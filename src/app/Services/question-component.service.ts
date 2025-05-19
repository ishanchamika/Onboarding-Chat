import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Question, QuestionType } from '../Models/conversation.model';
import { TextInputComponent } from '../Components/question-types/text-input/text-input.component';
import { RadioInputComponent } from '../Components/question-types/radio-input/radio-input.component';
import { DropdownInputComponent } from '../Components/question-types/dropdown-input/dropdown-input.component';
import { ButtonsInputComponent } from '../Components/question-types/buttons-input/buttons-input.component';
import { BaseQuestionComponent } from '../Components/question-types/base-question.component';
import { CalendarInputComponent } from '../Components/question-types/calendar-input/calendar-input.component';
import { SecondaryComponentInputComponent } from '../Components/question-types/secondaryComponent-input/secondaryComponent-input.component';
import { CheckboxInputComponent } from '../Components/question-types/checkbox-input/checkbox-input.component';
import { FileInputComponent } from '../Components/question-types/file-input/file-input.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionComponentService 
{
  private componentMap: Map<QuestionType, Type<BaseQuestionComponent>> = new Map();
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver) 
  {
    this.registerComponents();
  }

  
  
  private registerComponents(): void 
  {
    this.componentMap.set('text', TextInputComponent);
    this.componentMap.set('radio', RadioInputComponent);
    this.componentMap.set('dropdown', DropdownInputComponent);
    this.componentMap.set('buttons', ButtonsInputComponent);
    this.componentMap.set('calendar', CalendarInputComponent);
    this.componentMap.set('checkbox', CheckboxInputComponent);
    this.componentMap.set('file', FileInputComponent);
    this.componentMap.set('secondary', SecondaryComponentInputComponent);



  }
  
  loadQuestionComponent(question: Question, container: ViewContainerRef): BaseQuestionComponent 
  {
    // console.log(question);
    container.clear();
    
    const componentType = this.componentMap.get(question.inputType); // Changed to inputType
    if (!componentType) 
    {
      window.alert('No component Found as "'+  question.inputType + '"');
      throw new Error(`No component registered for question type: ${question.inputType}`); // Changed to inputType
    }
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const componentRef = container.createComponent(componentFactory);
    
    const component = componentRef.instance;
    component.question = question;
    
    return component;
  }
}