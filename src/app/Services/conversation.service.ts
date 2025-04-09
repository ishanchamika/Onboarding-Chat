import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question, HistoryItem, Option } from '../Models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  // Sample conversation tree
  private readonly conversationTree: Question = 
  {
    id: 'q1',
    question: 'Hello! What would you like to know about?',
    options: [
    {
        text: 'Products',
        next: {
          id: 'q2',
          question: 'Which product category are you interested in?',
          options: [
            {
              text: 'Electronics',
              next: {
                id: 'q4',
                question: 'What kind of electronics are you looking for?',
                options: [
                  {
                    text: 'Smartphones',
                    next: {
                      id: 'q7',
                      question: 'We have various smartphone models. What price range are you considering?',
                      options: [
                        { text: 'Budget ($100-$300)', next: null },
                        { text: 'Mid-range ($300-$700)', next: null },
                        { text: 'Premium ($700+)', next: null }
                      ]
                    }
                  },
                  {
                    text: 'Laptops',
                    next: {
                      id: 'q8',
                      question: 'What will you primarily use the laptop for?',
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
          options: [
            {
              text: 'Delivery',
              next: {
                id: 'q6',
                question: 'What would you like to know about our delivery service?',
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

  selectOption(option: Option): void {
    // Add to history
    const historyItems = this.historySubject.getValue();
    historyItems.push({
      question: this.currentQuestion.question,
      answer: option.text
    });
    this.historySubject.next(historyItems);

    // Set next question if available
    if (option.next) {
      this.currentQuestionSubject.next(option.next);
    }
  }

  resetConversation(): void {
    this.currentQuestionSubject.next(this.conversationTree);
    this.historySubject.next([]);
  }
}
