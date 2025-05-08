import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Question,
  HistoryItem,
  Option,
  QuestionType,
  Conversation,
} from '../Models/conversation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {

  //conversation structure
  // private readonly conversation: Conversation = 
  // {
  //   conversationId: '8631d9f7-1d59-45d3-9566-c12263800746',
  //   currentQuestionId: 'Q1',
  //   questions: 
  //   {
  //       Q1: {
  //         questionId: 'Q1',
  //         questionText: 'What is the business partner type?',
  //         inputType: 'buttons',
  //         options: [
  //           { text: 'Individual', nextQuestionId: 'Q2' },
  //           { text: 'Corporate', nextQuestionId: 'Q3' }
  //         ],
  //         requiresSubmitButton: false
  //       },
  //       Q4: {
  //       questionId: 'Q2',
  //       questionText: 'Please enter your address:',
  //       inputType: 'secondary',
  //       layoutColumn:4,
  //       subQuestions: {
  //         streetName: {
  //           questionId: 'Q2-streetName',
  //           questionText:'Street Name',
  //           inputType: 'text',
  //           placeholder: 'Enter street name',
  //           validation: { required: true },
  //           validationKey: 'name'
  //         },
  //         date: {
  //           questionId: 'Q2-date',
  //           questionText: 'Please select a date: (D/M/Y)',
  //           inputType: 'calendar',
  //           minDate: '2025-04-20',
  //           maxDate: '2025-04-30',
  //           validation: { required: true },
  //           validationKey: ''
  //         },
          
  //         city: {
  //           questionId: 'Q2-city',
  //           questionText:'City Name',
  //           inputType: 'radio',
  //           options: [
  //             { text: 'Colombo', value: 'CB' },
  //             { text: 'Kandy', value: 'KD' },
  //             { text: 'Ragama', value: 'RG' }
  //           ],
  //           validation: { required: true },
  //           validationKey:'name'
  //         },
  //         houseNumber: {
  //           questionId: 'Q2-houseNumber',
  //           questionText:'House Name',
  //           inputType: 'text',
  //           placeholder: 'Enter house number',
  //           validation: { required: true },
  //           validationKey: 'salary'
  //         },
  //         state: {
  //           questionId: 'Q2-state',
  //           questionText:'State Name',
  //           inputType: 'dropdown',
  //           options: [
  //             { text: 'Western', value: 'WP' },
  //             { text: 'South', value: 'SP' },
  //             { text: 'Central', value: 'CP' }
  //           ],
  //           validation: { required: true }
  //         }
  //       },
  //       nextQuestionId: 'Q5',
  //       requiresSubmitButton: true
  //     },
      

  //     Q2: {
  //       questionId: 'Q2',
  //       questionText: 'What is your full name?',
  //       inputType: 'text',
  //       placeholder: 'Enter your full name',
  //       validationKey: 'name',
  //       nextQuestionId: 'Q4',
  //       requiresSubmitButton: true
  //     },
  //     Q3: {
  //       questionId: 'Q3',
  //       questionText: 'What is your company name?',
  //       inputType: 'text',
  //       placeholder: 'Enter company name',
  //       nextQuestionId: 'Q4',
  //       requiresSubmitButton: true,
  //       validationKey:'name'
  //     },
  //     Q5: {
  //       questionId: 'Q5',
  //       questionText: 'What is your annual revenue?',
  //       inputType: 'text',
  //       placeholder: 'Enter amount in dollars',
  //       validation: {
  //         required: true,
  //         min: 0,
  //       },
  //       nextQuestionId: 'Q6',
  //       requiresSubmitButton: true,
  //       validationKey: 'salary'
  //     },
  //     Q6: {
  //       questionId: 'Q6',
  //       questionText: 'Which industry do you operate in?',
  //       inputType: 'dropdown',
  //       options: [
  //         { text: 'Technology', nextQuestionId: 'Q7' },
  //         { text: 'Healthcare', nextQuestionId: 'Q7' },
  //         { text: 'Finance', nextQuestionId: 'Q7' },
  //         { text: 'Retail', nextQuestionId: 'Q7' },
  //         { text: 'Other', nextQuestionId: 'Q7' },
  //       ],
  //       validationKey: 'no',
  //       requiresSubmitButton: true
  //     },
  //     Q7: {
  //       questionId: 'Q7',
  //       questionText: 'Please select a date: (D/M/Y)',
  //       inputType: 'calendar',
  //       nextQuestionId: 'Q10',
  //       validationKey: 'no',
  //       requiresSubmitButton: true,
  //       minDate: '2025-04-19',
  //       maxDate: '2025-04-29'
  //     },
  //     Q10: {
  //       questionId: 'Q10',
  //       questionText: 'How many employees do you have?',
  //       inputType: 'radio',
  //       options: [
  //         { text: '1-10', nextQuestionId: 'Q8' },
  //         { text: '11-50', nextQuestionId: 'Q8' },
  //         { text: '51-200', nextQuestionId: 'Q8' },
  //         { text: '201-1000', nextQuestionId: 'Q8' },
  //         { text: '1000+', nextQuestionId: 'Q8' },
  //       ],
  //       validationKey: 'no',
  //       requiresSubmitButton: true
  //     },
      
  //     Q8: {
  //       questionId: 'Q8',
  //       questionText: 'What services are you interested in?',
  //       inputType: 'buttons',
  //       options: [
  //         { text: 'Consulting', nextQuestionId: 'END' },
  //         { text: 'Software Development', nextQuestionId: 'END' },
  //         { text: 'Cloud Services', nextQuestionId: 'END' },
  //         { text: 'Support', nextQuestionId: 'END' },
  //       ],
  //     },
  //     END: {
  //       questionId: 'END',
  //       questionText:
  //         'Thank you for your responses! Is there anything else I can help you with?',
  //       inputType: 'buttons',
  //       options: [
  //         { text: 'Start Over', nextQuestionId: 'Q1' },
  //         { text: "No, I'm done", nextQuestionId: null },
  //       ],
  //     },
  //   },
    // this.storeConversationInIndexedDB(conversation);
  // };

  



  private conversation : Conversation | null = null;
  private currentQuestionSubject = new BehaviorSubject<Question|null>(
    // this.conversation.questions[this.conversation.currentQuestionId]
    null
  );
  private historySubject = new BehaviorSubject<HistoryItem[]>([]);

  constructor(private http : HttpClient) 
  {
    // this.storeConversationInIndexedDB(this.conversation);
  }

  get currentQuestion$(): Observable<Question|null> {
    return this.currentQuestionSubject.asObservable();
  }

  get currentQuestion(): Question | null {
    return this.currentQuestionSubject.getValue();
  }

  get history$(): Observable<HistoryItem[]> {
    return this.historySubject.asObservable();
  }

  async loadConversation(conversationId: string): Promise<void> 
  {
    console.log(conversationId)
    try 
    {
      
      this.conversation = await this.http.get<any>('http://localhost:5149/api/Conversation/' + conversationId).toPromise() ?? null;

      if(this.conversation) 
      {
        this.storeConversationInIndexedDB(this.conversation);
        this.loadQuestionFromIndexedDB(this.conversation.conversationId, this.conversation.currentQuestionId);
      }
      else 
      {
        console.error('No conversation data received from the backend');
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error; // Optionally rethrow or handle differently
    }
  }

  handleAnswer(answer: any): void 
  {
    const current = this.currentQuestion;
    if(!current || !this.conversation) {
      console.error('Conversation or current question not loaded');
      return;
    }
    let answerText: string;
    let nextQuestionId: string | null = null;

    // Handle different answer types
    if(answer instanceof Date) {
      answerText = answer.toLocaleDateString();
      nextQuestionId = current.nextQuestionId || null;
    } else if (typeof answer === 'string' || typeof answer === 'number') {
      answerText = answer.toString();
      nextQuestionId = current.nextQuestionId || null;
    } else if (answer.text && answer.value) {
      answerText = answer.text;
      nextQuestionId = current.nextQuestionId || null;
    } else {
      answerText = answer.text;
      nextQuestionId = answer.nextQuestionId;
    }

    // Add to history
    const historyItems = this.historySubject.getValue();
    historyItems.push({
      question: current.questionText || '',
      answer: answerText,
    });
    this.historySubject.next(historyItems);

    // Set next question if available
    if(nextQuestionId && this.conversation?.conversationId) {
      this.loadQuestionFromIndexedDB(this.conversation.conversationId, nextQuestionId);
    } 
    else 
    {
      // End of conversation path
      const endQuestion: Question = {
        questionId: 'final',
        questionText: 'Conversation ended. Thank you!',
        inputType: 'buttons',
        options: [
          {
            text: 'Start Over',
            nextQuestionId: this.conversation.currentQuestionId,
          },
        ],
        requiresSubmitButton: false
      };
      this.currentQuestionSubject.next(endQuestion);
    }
  }

  resetConversation(): void {
    if (!this.conversation) {
      console.error('Conversation not loaded');
      return;
    }
    const initialQuestion =
      this.conversation.questions[this.conversation.currentQuestionId];
    this.currentQuestionSubject.next(initialQuestion);
    this.historySubject.next([]);
  }

  storeConversationInIndexedDB(conversation: any) : void
  {
    const request = indexedDB.open('ConversationDB', 1);
  
    request.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('conversations')) {
        db.createObjectStore('conversations', { keyPath: 'conversationId' });
      }
    };
  
    request.onsuccess = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction('conversations', 'readwrite');
      const store = transaction.objectStore('conversations');
      store.put(conversation);
  
      transaction.oncomplete = function () {
        console.log('Conversation stored successfully!');
      };
  
      transaction.onerror = function () {
        console.error('Error storing conversation:', transaction.error);
      };
    };
  
    request.onerror = function () {
      console.error('Error opening database:', request.error);
    };
  }

  async loadQuestionFromIndexedDB(conversationId: string, questionId: string): Promise<void> 
  {
    const request = indexedDB.open('ConversationDB', 1);
  
    request.onsuccess = (event) => 
    {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction('conversations', 'readonly');
      const store = transaction.objectStore('conversations');
      const getRequest = store.get(conversationId);
  
      getRequest.onsuccess = () => 
      {
        const storedConversation = getRequest.result;
        if(storedConversation && storedConversation.questions && storedConversation.questions[questionId]) 
        {
          const question = storedConversation.questions[questionId];
          this.currentQuestionSubject.next(question);
        } 
        else 
        {
          console.log('Question not found in IndexedDB');
        }
      };
  
      getRequest.onerror = () => {
        console.log('Error retrieving conversation from IndexedDB:', getRequest.error);
      };
    };
  
    request.onerror = () => {
      console.log('Error opening database:', request.error);
    };
  }
  
}
