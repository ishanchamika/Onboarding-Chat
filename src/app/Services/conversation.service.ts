import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question, HistoryItem, Option, QuestionType, Conversation } from '../Models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  // New conversation structure with a questions map
  private readonly conversation: Conversation = {
    conversationId: '8631d9f7-1d59-45d3-9566-c12263800746',
    currentQuestionId: 'Q1',
    questions: {
      'Q1': {
      questionId: 'Q1',
      questionText: 'Please select a date: (D/M/Y)',
      inputType: 'calendar',
      nextQuestionId: 'Q2',
      customValidation: 'custom validation'
    },
      // 'Q1': {
      //   questionId: 'Q1',
      //   questionText: 'What is the business partner type?',
      //   inputType: 'buttons', // Mapping 'selection' to 'buttons'
      //   options: [
      //     { text: 'Individual', nextQuestionId: 'Q2' },
      //     { text: 'Corporate', nextQuestionId: 'Q3' }
      //   ]
      // },
      'Q2': {
        questionId: 'Q2',
        questionText: 'What is your full name?',
        inputType: 'text',
        placeholder: 'Enter your full name',
        nextQuestionId: 'Q4',
        validationKey: 'name'
      },
      'Q3': {
        questionId: 'Q3',
        questionText: 'What is your company name?',
        inputType: 'text',
        placeholder: 'Enter company name',
        nextQuestionId: 'Q4',
        validationKey:''
      },
      'Q4': {
        questionId: 'Q4',
        questionText: 'What is your annual revenue?',
        inputType: 'text',
        placeholder: 'Enter amount in dollars',
        validation: {
          required: true,
          min: 0
        },
        nextQuestionId: 'Q5',
        validationKey:'salary'
      },
      'Q5': {
        questionId: 'Q5',
        questionText: 'Which industry do you operate in?',
        inputType: 'dropdown',
        options: [
          { text: 'Technology', nextQuestionId: 'Q6' },
          { text: 'Healthcare', nextQuestionId: 'Q6' },
          { text: 'Finance', nextQuestionId: 'Q6' },
          { text: 'Retail', nextQuestionId: 'Q6' },
          { text: 'Other', nextQuestionId: 'Q6' }
        ]
      },
      'Q6': {
        questionId: 'Q6',
        questionText: 'How many employees do you have?',
        inputType: 'radio',
        options: [
          { text: '1-10', nextQuestionId: 'Q7' },
          { text: '11-50', nextQuestionId: 'Q7' },
          { text: '51-200', nextQuestionId: 'Q7' },
          { text: '201-1000', nextQuestionId: 'Q7' },
          { text: '1000+', nextQuestionId: 'Q7' }
        ]
      },
      'Q7': {
        questionId: 'Q7',
        questionText: 'What services are you interested in?',
        inputType: 'buttons',
        options: [
          { text: 'Consulting', nextQuestionId: 'END' },
          { text: 'Software Development', nextQuestionId: 'END' },
          { text: 'Cloud Services', nextQuestionId: 'END' },
          { text: 'Support', nextQuestionId: 'END' }
        ]
      },
      'END': {
        questionId: 'END',
        questionText: 'Thank you for your responses! Is there anything else I can help you with?',
        inputType: 'buttons',
        options: [
          { text: 'Start Over', nextQuestionId: 'Q1' },
          { text: 'No, I\'m done', nextQuestionId: null }
        ]
      }
    }
  };

  private currentQuestionSubject = new BehaviorSubject<Question>(
    this.conversation.questions[this.conversation.currentQuestionId]
  );
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
    console.log('bbbbbb', current);
    let answerText: string;
    let nextQuestionId: string | null = null;

    // Handle different answer types
    if (answer instanceof Date) {
      answerText = answer.toLocaleDateString();
      nextQuestionId = current.nextQuestionId || null;
    }
    else if (typeof answer === 'string' || typeof answer === 'number') {
      answerText = answer.toString();
      nextQuestionId = current.nextQuestionId || null;
    } else {
      // It's an Option object
      answerText = answer.text;
      nextQuestionId = answer.nextQuestionId;
    }

    // Add to history
    const historyItems = this.historySubject.getValue();
    historyItems.push({
      question: current.questionText,
      answer: answerText
    });
    this.historySubject.next(historyItems);

    // Set next question if available
    if (nextQuestionId) {
      const nextQuestion = this.conversation.questions[nextQuestionId];
      this.currentQuestionSubject.next(nextQuestion);
    } else {
      // End of conversation path
      const endQuestion: Question = {
        questionId: 'final',
        questionText: 'Conversation ended. Thank you!',
        inputType: 'buttons',
        options: [
          { text: 'Start Over', nextQuestionId: this.conversation.currentQuestionId }
        ]
      };
      this.currentQuestionSubject.next(endQuestion);
    }
  }

  resetConversation(): void {
    const initialQuestion = this.conversation.questions[this.conversation.currentQuestionId];
    this.currentQuestionSubject.next(initialQuestion);
    this.historySubject.next([]);
  }
}