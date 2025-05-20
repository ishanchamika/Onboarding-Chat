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
  
  currentQuestion$: Observable<Question|null>;
  currentQuestion: Question | null = null; // Declare currentQuestion
  currentQuestionComponent: BaseQuestionComponent | null = null; // Declare currentQuestionComponent
  messages: { type: 'bot' | 'user', text: string }[] = [];
  isSubmitButton: any = false;
  private conversationId: string =
  // '8631d9f7-1d59-45d3-9566-c12263800746'
      '8631d9f7-1d59-45d3-9566';
  
  constructor(
    private conversationService: ConversationService,
    private questionComponentService: QuestionComponentService
  ) {
    this.currentQuestion$ = this.conversationService.currentQuestion$;
  }
  
  async ngOnInit(): Promise<void> 
  {
    this.conversationService.initializeAnswerDB();
    this.conversationService.initializeProgressDB();
    this.loadAnswersFromIndexedDB();
    this.currentQuestion$ = this.conversationService.currentQuestion$;
    await this.conversationService.loadConversation( this.conversationId);
    this.currentQuestion$.subscribe(question => {
      if(!question) return;

      const questionWithConversationId: Question = { ...question, conversationId: this.conversationId }
      
      // Add the bot message with the question
      if(this.messages.length === 0 || this.messages[this.messages.length - 1].text !== question.questionText) 
      {
        this.messages.push({
          type: 'bot',
          text: question.questionText || '' // Changed to questionText
        });
      }

      this.isSubmitButton = question.requiresSubmitButton;
      setTimeout(() => 
      {
        if(this.questionContainer) 
        {
          const component = this.questionComponentService.loadQuestionComponent(questionWithConversationId, this.questionContainer);
          // Assign the component instance
          this.currentQuestionComponent = component;
          // Subscribe to answer events
          component.answerSubmitted.subscribe(answer => 
          {
            this.handleAnswer(answer, questionWithConversationId);
            // console.log('anssswer', answer);
          });
        }
      });
    });
  }
  
  handleAnswer(answer: any, question:any): void {
    let answerText: string;

    if(answer.type == 'dropdown') {
      answerText = answer.text.text.toString()  ;
    } 
    else if(answer.type == 'calender') {
      answerText = answer.text.toLocaleDateString();
    }
    else if (answer.type == 'input') {
      answerText = answer.text.toString();
    } 
    else if (answer.type=='button') {
      answerText = answer.text.text;
    } 
    else if (answer.type=='radio') {
      answerText = answer.text.text;
    } 
    else if(answer.type == 'secondary'){
      answerText = answer.text;
    }
    else if(answer.type == 'checkbox'){
      answerText = answer.text;
    }
    else if(answer.type == 'checkbox'){
      answerText = answer.text;
    }
    else if(answer.type === 'file' ){
      answerText = answer.text;
    }
    else {
      answerText = 'Unknown answer';
    }
    
    // Add user message
    this.messages.push({
      type: 'user',
      text: answerText
    });
    
    // Process the selection in conversation service
    this.conversationService.handleAnswer(answer, question);
  }

  submitCurrentAnswer(): void {
    if (this.currentQuestionComponent) {
      this.currentQuestionComponent.onSubmitButtonClicked();
    }
  }
  
  trackByFn(index: number): number {
    return index;
  }



    //____________Load answers from IndexedDB_______________
    loadAnswersFromIndexedDB(): void {
      const request = indexedDB.open('AnswerDB', 1);
    
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(['answers'], 'readonly');
        const store = transaction.objectStore('answers');
    
        const getAllRequest = store.getAll();
    
        getAllRequest.onsuccess = () => {
          const storedAnswers = getAllRequest.result;
    
          storedAnswers.forEach((item: any) => {
            let formattedAnswer = '';
    
            if (!item.value) {
              formattedAnswer = '';
            } 
            else if (typeof item.value === 'object' && 'text' in item.value) {
              formattedAnswer = item.value.text;
            } 
            else if (item.value instanceof Date) {
              formattedAnswer = item.value.toLocaleDateString();
            }
            else if (typeof item.value === 'string' && !isNaN(Date.parse(item.value))) {
              formattedAnswer = new Date(item.value).toLocaleDateString();
            } 
            else if (Array.isArray(item.value) && item.value.every((v: { text: string }) => v && typeof v === 'object' && 'text' in v)) {
              formattedAnswer = item.value.map((opt: { text: string }) => opt.text).join(', ');
            }
            else if (typeof item.value === 'object') {
              formattedAnswer = Object.entries(item.value)
                .map(([key, val]) => `${key.split('-').pop()}: ${val}`)
                .join(', ');
            } 
            else {
              formattedAnswer = String(item.value);
            }
    
            // Push to chat-style messages array
            this.messages.push(
              { type: 'bot', text: item.Question },
              { type: 'user', text: formattedAnswer }
            );
          });
        };
    
        getAllRequest.onerror = (err) => {
          console.error('Error retrieving answers from IndexedDB:', err);
        };
      };
    
      request.onerror = (err) => {
        console.error('Error opening IndexedDB:', err);
      };
    }
    
    clearIndexedDb()
    {
      const reset = window.confirm("This will delete your all local data!");
      if(!reset)
      {
        return;
      }
      const dbsToDelete = ['AnswerDB', 'ProgressDB', 'ConversationDB'];
      dbsToDelete.forEach((dbName) => 
      {
        const deleteRequest = indexedDB.deleteDatabase(dbName);

        deleteRequest.onsuccess = () => {
          console.log(`Deleted database: ${dbName}`);
        };

        deleteRequest.onerror = (event) => {
          console.error(`Error deleting database ${dbName}:`, event);
        };

        deleteRequest.onblocked = () => {
          console.warn(`Deletion of database "${dbName}" is blocked. Please close all tabs using it.`);
        };
      });
      location.reload();
    }
}