import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../Models/conversation.model';

@Component({
  template: ''
})
export abstract class BaseQuestionComponent {
  @Input() question!: Question;
  @Output() answerSubmitted = new EventEmitter<any>();
  
  protected submitAnswer(answer: any): void {
    this.answerSubmitted.emit(answer);
  }
}