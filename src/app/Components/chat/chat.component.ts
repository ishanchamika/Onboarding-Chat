import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question, HistoryItem } from '../../Models/conversation.model';
import { ConversationService } from '../../Services/conversation.service';
import { QuestionComponentService } from '../../Services/question-component.service';
import { BaseQuestionComponent } from '../question-types/base-question.component';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('questionContainer', { read: ViewContainerRef, static: false }) 
  questionContainer!: ViewContainerRef;
  
  currentQuestion?: Question;
  history: HistoryItem[] = [];
  loading = true;
  
  private currentQuestionSub?: Subscription;
  private historySub?: Subscription;
  private currentComponent?: BaseQuestionComponent;
  
  constructor(
    private conversationService: ConversationService,
    private questionComponentService: QuestionComponentService
  ) {}
  
  ngOnInit(): void {
    // Subscribe to current question changes
    this.currentQuestionSub = this.conversationService.currentQuestion$.subscribe(question => {
      this.currentQuestion = question;
      this.loading = false;
      
      // Wait for view to initialize if needed
      setTimeout(() => {
        if (this.questionContainer) {
          this.loadQuestionComponent();
        }
      });
    });
    
    // Subscribe to history changes
    this.historySub = this.conversationService.history$.subscribe(history => {
      this.history = history;
    });
  }
  
  ngOnDestroy(): void {
    this.currentQuestionSub?.unsubscribe();
    this.historySub?.unsubscribe();
  }
  
  loadQuestionComponent(): void {
    if (!this.currentQuestion || !this.questionContainer) {
      return;
    }
    
    this.currentComponent = this.questionComponentService.loadQuestionComponent(
      this.currentQuestion, 
      this.questionContainer
    );
    
    // Subscribe to answer submissions
    if (this.currentComponent) {
      this.currentComponent.answerSubmitted.subscribe(answer => {
        this.handleAnswer(answer);
      });
    }
  }
  
  handleAnswer(answer: any): void {
    this.loading = true;
    this.conversationService.handleAnswer(answer);
  }
  
  resetConversation(): void {
    this.loading = true;
    this.conversationService.resetConversation();
  }
}