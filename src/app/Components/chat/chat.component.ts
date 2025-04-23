import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Question, Option } from '../../Models/conversation.model';
import { ConversationService } from '../../Services/conversation.service';
import { QuestionComponentService } from '../../Services/question-component.service';
import { BaseQuestionComponent } from '../question-types/base-question.component';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit 
{
  @ViewChild('questionContainer', { read: ViewContainerRef, static: false }) 
  questionContainer!: ViewContainerRef;
  
  currentQuestion$: Observable<Question>;
  currentQuestion: Question | null = null; // Declare currentQuestion
  currentQuestionComponent: BaseQuestionComponent | null = null; // Declare currentQuestionComponent
  messages: { type: 'bot' | 'user', text: string }[] = [];
  isSubmitButton: any = false;
  
  constructor(
    private conversationService: ConversationService,
    private questionComponentService: QuestionComponentService
  ) {
    this.currentQuestion$ = this.conversationService.currentQuestion$;
  }
  
  ngOnInit(): void {
    this.currentQuestion$.subscribe(question => {
      
      // Add the bot message with the question
      if (this.messages.length === 0 || 
          this.messages[this.messages.length - 1].text !== question.questionText) { // Changed to questionText
        this.messages.push({
          type: 'bot',
          text: question.questionText || '' // Changed to questionText
        });

      }
      this.isSubmitButton = question.requiresSubmitButton;
    setTimeout(() => {
      if (this.questionContainer) {
        const component = this.questionComponentService.loadQuestionComponent(
          question, 
          this.questionContainer
        );
        // Assign the component instance
        this.currentQuestionComponent = component;
        // Subscribe to answer events
        component.answerSubmitted.subscribe(answer => {
          this.handleAnswer(answer);
        });
      }
    });
  });
  }
  
  handleAnswer(answer: any): void {
    let answerText: string;
    
    // Handle different answer types
    if (answer instanceof Date) {
      answerText = answer.toLocaleDateString(); // Format the date for display
    }
    else if (typeof answer === 'string' || typeof answer === 'number') {
      answerText = answer.toString();
    }
    else if (answer.text) {
      // Handle Option or address objects
      answerText = answer.text;
     } else {
      answerText = 'Unknown answer';
    }
    
    // Add user message
    this.messages.push({
      type: 'user',
      text: answerText
    });
    
    // Process the selection in conversation service
    this.conversationService.handleAnswer(answer);
  }

  submitCurrentAnswer(): void {
    if (this.currentQuestionComponent) {
      this.currentQuestionComponent.onSubmitButtonClicked();
    }
  }
  
  trackByFn(index: number): number {
    return index;
  }
}