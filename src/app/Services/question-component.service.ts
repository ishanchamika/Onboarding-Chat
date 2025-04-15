import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Question, QuestionType } from '../Models/conversation.model';
import { TextInputComponent } from '../Components/question-types/text-input/text-input.component';
import { NumberInputComponent } from '../Components/question-types/number-input/number-input.component';
import { RadioInputComponent } from '../Components/question-types/radio-input/radio-input.component';
import { DropdownInputComponent } from '../Components/question-types/dropdown-input/dropdown-input.component';
import { ButtonsInputComponent } from '../Components/question-types/buttons-input/buttons-input.component';
import { BaseQuestionComponent } from '../Components/question-types/base-question.component';

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
    this.componentMap.set('number', NumberInputComponent);
    this.componentMap.set('radio', RadioInputComponent);
    this.componentMap.set('dropdown', DropdownInputComponent);
    this.componentMap.set('buttons', ButtonsInputComponent);
  }
  
  loadQuestionComponent(question: Question, container: ViewContainerRef): BaseQuestionComponent 
  {
    container.clear();
    
    const componentType = this.componentMap.get(question.inputType); // Changed to inputType
    if (!componentType) 
    {
      throw new Error(`No component registered for question type: ${question.inputType}`); // Changed to inputType
    }
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const componentRef = container.createComponent(componentFactory);
    
    const component = componentRef.instance;
    component.question = question;
    
    return component;
  }
}