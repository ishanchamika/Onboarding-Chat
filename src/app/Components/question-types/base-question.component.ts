import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../Models/conversation.model';
import { ConversationService } from '../../Services/conversation.service';
import { Observable } from 'rxjs';

@Component({
  template: ''
})
export abstract class BaseQuestionComponent {
  @Input() question!: Question;
  @Output() answerSubmitted = new EventEmitter<any>();

   currentQuestion$: Observable<Question | null>;
    currentQuestion: Question | null = null;

  constructor(
      private conversationService: ConversationService
    ) {
      this.currentQuestion$ = this.conversationService.currentQuestion$;
    }
  
  protected submitAnswer(answer: any): void {
    this.answerSubmitted.emit(answer);
  }
  abstract onSubmitButtonClicked(): void;
  abstract canSubmit(): boolean;
}