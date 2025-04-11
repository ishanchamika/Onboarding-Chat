import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Question, InputType } from '../Models/conversation.model';
import { TextInputComponent } from '../Components/question-types/text-input/text-input.component';
import { NumberInputComponent } from '../Components/question-types/number-input/number-input.component';
import { RadioInputComponent } from '../Components/question-types/radio-input/radio-input.component';
import { DropdownInputComponent } from '../Components/question-types/dropdown-input/dropdown-input.component';
import { ButtonsInputComponent } from '../Components/question-types/buttons-input/buttons-input.component';
import { SelectionInputComponent } from '../Components/question-types/selection-input/selection-input.component';
import { BaseQuestionComponent } from '../Components/question-types/base-question.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionComponentService {
  private componentMap: Map<InputType, Type<BaseQuestionComponent>> = new Map();
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.registerComponents();
  }
  
  private registerComponents(): void {
    this.componentMap.set('text', TextInputComponent);
    this.componentMap.set('number', NumberInputComponent);
    this.componentMap.set('radio', RadioInputComponent);
    this.componentMap.set('dropdown', DropdownInputComponent);
    this.componentMap.set('buttons', ButtonsInputComponent);
    this.componentMap.set('selection', SelectionInputComponent); // New component for selection
  }
  
  loadQuestionComponent(question: Question, container: ViewContainerRef): BaseQuestionComponent {
    container.clear();
    
    const componentType = this.componentMap.get(question.inputType);
    if (!componentType) {
      throw new Error(`No component registered for input type: ${question.inputType}`);
    }
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const componentRef = container.createComponent(componentFactory);
    
    const component = componentRef.instance;
    component.question = question;
    
    return component;
  }
}