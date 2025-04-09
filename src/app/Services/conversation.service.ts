import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question, HistoryItem, Option, QuestionType } from '../Models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService 
{
  // Sample conversation tree with different question types
  private readonly conversationTree: Question = {
    id: 'q1',
    question: 'Hello! What would you like to know about?',
    type: 'buttons',
    options: [
      {
        text: 'Products',
        next: {
          id: 'q2',
          question: 'Which product category are you interested in?',
          type: 'radio',
          options: [
            {
              text: 'Electronics',
              next: {
                id: 'q4',
                question: 'What kind of electronics are you looking for?',
                type: 'dropdown',
                options: [
                  {
                    text: 'Smartphones',
                    next: {
                      id: 'q7',
                      question: 'What is your budget for a smartphone?',
                      type: 'number',
                      placeholder: 'Enter amount in dollars',
                      validation: {
                        required: true,
                        min: 100,
                        max: 2000
                      },
                      next: {
                        id: 'q9',
                        question: 'What features are most important to you?',
                        type: 'text',
                        placeholder: 'Describe what you need',
                        next: null
                      }
                    }
                  },
                  {
                    text: 'Laptops',
                    next: {
                      id: 'q8',
                      question: 'What will you primarily use the laptop for?',
                      type: 'buttons',
                      options: [
                        { text: 'Work/Business', next: null },
                        { text: 'Gaming', next: null },
                        { text: 'Student Use', next: null }
                      ]
                    }
                  },
                  { text: 'Audio Devices', next: null }
                ]
              }
            },
            {
              text: 'Home Goods',
              next: {
                id: 'q5',
                question: 'What type of home goods are you interested in?',
                type: 'buttons',
                options: [
                  { text: 'Kitchen Appliances', next: null },
                  { text: 'Furniture', next: null },
                  { text: 'Decor', next: null }
                ]
              }
            },
            { text: 'Clothing', next: null }
          ]
        }
      },
      {
        text: 'Services',
        next: {
          id: 'q3',
          question: 'Which service are you interested in learning about?',
          type: 'buttons',
          options: [
            {
              text: 'Delivery',
              next: {
                id: 'q6',
                question: 'What would you like to know about our delivery service?',
                type: 'buttons',
                options: [
                  { text: 'Delivery Areas', next: null },
                  { text: 'Shipping Costs', next: null },
                  { text: 'Delivery Times', next: null }
                ]
              }
            },
            { text: 'Installation', next: null },
            { text: 'Support', next: null }
          ]
        }
      },
      { text: 'Contact Info', next: null }
    ]
  };

  private currentQuestionSubject = new BehaviorSubject<Question>(this.conversationTree);
  private historySubject = new BehaviorSubject<HistoryItem[]>([]);

  constructor() {}

  get currentQuestion$(): Observable<Question> {
    return this.currentQuestionSubject.asObservable();
  }

  get currentQuestion(): Question {
    return this.currentQuestionSubject.getValue();
  }

  get history$(): Observable<HistoryItem[]> {
    return this.historySubject.asObservable();
  }

  handleAnswer(answer: any): void {
    const current = this.currentQuestion;
    let answerText: string;
    let nextQuestion: Question | null = null;
    
    // Handle different answer types
    if (typeof answer === 'string' || typeof answer === 'number') {
      answerText = answer.toString();
      nextQuestion = current.next || null;
    } else {
      // It's an Option object
      answerText = answer.text;
      nextQuestion = answer.next;
    }
    
    // Add to history
    const historyItems = this.historySubject.getValue();
    historyItems.push({
      question: current.question,
      answer: answerText
    });
    this.historySubject.next(historyItems);

    // Set next question if available
    if (nextQuestion) {
      this.currentQuestionSubject.next(nextQuestion);
    } else {
      // End of conversation path
      const endQuestion: Question = {
        id: 'end',
        question: 'Thank you for your responses! Is there anything else I can help you with?',
        type: 'buttons',
        options: [
          { 
            text: 'Start Over', 
            next: this.conversationTree 
          },
          { 
            text: 'No, I\'m done', 
            next: null 
          }
        ]
      };
      this.currentQuestionSubject.next(endQuestion);
    }
  }

  resetConversation(): void {
    this.currentQuestionSubject.next(this.conversationTree);
    this.historySubject.next([]);
  }
}