import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Question, Option } from '../../Models/conversation.model';
import { ConversationService } from '../../Services/conversation.service';
import { QuestionComponentService } from '../../Services/question-component.service';

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
  messages: { type: 'bot' | 'user', text: string }[] = [];
  
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
          this.messages[this.messages.length - 1].text !== question.question) {
        this.messages.push({
          type: 'bot',
          text: question.question
        });
      }
      
      // Load the appropriate component when the view is ready
      setTimeout(() => {
        if (this.questionContainer) {
          const component = this.questionComponentService.loadQuestionComponent(
            question, 
            this.questionContainer
          );
          
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
    if (typeof answer === 'string' || typeof answer === 'number') {
      answerText = answer.toString();
    } else {
      // It's an Option object
      answerText = answer.text;
    }
    
    // Add user message
    this.messages.push({
      type: 'user',
      text: answerText
    });
    
    // Process the selection in conversation service
    this.conversationService.handleAnswer(answer);
  }
  
  trackByFn(index: number): number {
    return index;
  }
}
