import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Question,
  HistoryItem,
  Option,
  QuestionType,
  Conversation,
} from '../Models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  //conversation structure
  private readonly conversation: Conversation = {
    conversationId: '8631d9f7-1d59-45d3-9566-c12263800746',
    currentQuestionId: 'Q1',
    questions: {
        'Q1': {
          questionId: 'Q1',
          questionText: 'What is the business partner type?',
          inputType: 'buttons',
          options: [
            { text: 'Individual', nextQuestionId: 'Q2' },
            { text: 'Corporate', nextQuestionId: 'Q3' }
          ],
          requiresSubmitButton: false
        },
        'Q4': {
        questionId: 'Q2',
        questionText: 'Please enter your address:',
        inputType: 'secondary2x2',
        subQuestions: {
          streetName: {
            questionId: 'Q2-streetName',
            questionText:'Street Name',
            inputType: 'text',
            placeholder: 'Enter street name',
            validation: { required: true },
            validationKey: 'name'
          },
          date: {
            questionId: 'Q2-date',
            questionText: 'Please select a date: (D/M/Y)',
            inputType: 'calendar',
            minDate: '2025-04-20',
            maxDate: '2025-04-30',
            validation: { required: true },
            validationKey: ''
          },
          
          city: {
            questionId: 'Q2-city',
            questionText:'City Name',
            inputType: 'radio',
            options: [
              { text: 'Colombo', value: 'CB' },
              { text: 'Kandy', value: 'KD' },
              { text: 'Ragama', value: 'RG' }
            ],
            validation: { required: true },
            validationKey:'name'
          },
          houseNumber: {
            questionId: 'Q2-houseNumber',
            questionText:'House Name',
            inputType: 'text',
            placeholder: 'Enter house number',
            validation: { required: true },
            validationKey: 'salary'
          },
          state: {
            questionId: 'Q2-state',
            questionText:'State Name',
            inputType: 'dropdown',
            options: [
              { text: 'Western', value: 'WP' },
              { text: 'South', value: 'SP' },
              { text: 'Central', value: 'CP' }
            ],
            validation: { required: true }
          }
        },
        nextQuestionId: 'Q5',
        requiresSubmitButton: true
      },
      
      // Q1: {
      //   questionId: 'Q1',
      //   questionText: 'Please select a date: (D/M/Y)',
      //   inputType: 'calendar',
      //   nextQuestionId: 'Q2',
      // },
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
        validationKey: 'name',
        nextQuestionId: 'Q4',
        requiresSubmitButton: true
      },
      // 'Q2': {
      //   questionId: 'Q2',
      //   questionText: 'Please enter your address:',
      //   inputType: 'address',
      //   subQuestions: {
      //     streetName: {
      //       questionId: 'Q2-streetName',
      //       inputType: 'text',
      //       placeholder: 'Enter street name',
      //       validation: { required: true }
      //     },
      //     houseNumber: {
      //       questionId: 'Q2-houseNumber',
      //       inputType: 'text',
      //       placeholder: 'Enter house number',
      //       validation: { required: true }
      //     },
      //     city: {
      //       questionId: 'Q2-city',
      //       inputType: 'dropdown',
      //       options: [
      //         { text: 'New York', value: 'NY' },
      //         { text: 'Los Angeles', value: 'LA' },
      //         { text: 'Chicago', value: 'CHI' }
      //       ],
      //       validation: { required: true }
      //     },
      //     state: {
      //       questionId: 'Q2-state',
      //       inputType: 'dropdown',
      //       options: [
      //         { text: 'California', value: 'CA' },
      //         { text: 'Texas', value: 'TX' },
      //         { text: 'Florida', value: 'FL' }
      //       ],
      //       validation: { required: true }
      //     }
      //   },
      //   nextQuestionId: 'Q4'
      // },
      Q3: {
        questionId: 'Q3',
        questionText: 'What is your company name?',
        inputType: 'text',
        placeholder: 'Enter company name',
        nextQuestionId: 'Q4',
        requiresSubmitButton: true,
        validationKey:'name'
      },
      Q5: {
        questionId: 'Q5',
        questionText: 'What is your annual revenue?',
        inputType: 'text',
        placeholder: 'Enter amount in dollars',
        validation: {
          required: true,
          min: 0,
        },
        nextQuestionId: 'Q6',
        requiresSubmitButton: true,
        validationKey: 'salary'
      },
      Q6: {
        questionId: 'Q6',
        questionText: 'Which industry do you operate in?',
        inputType: 'dropdown',
        options: [
          { text: 'Technology', nextQuestionId: 'Q7' },
          { text: 'Healthcare', nextQuestionId: 'Q7' },
          { text: 'Finance', nextQuestionId: 'Q7' },
          { text: 'Retail', nextQuestionId: 'Q7' },
          { text: 'Other', nextQuestionId: 'Q7' },
        ],
        validationKey: 'no',
        requiresSubmitButton: true
      },
      Q7: {
        questionId: 'Q7',
        questionText: 'Please select a date: (D/M/Y)',
        inputType: 'calendar',
        nextQuestionId: 'Q10',
        validationKey: 'no',
        requiresSubmitButton: true,
        minDate: '2025-04-19',
        maxDate: '2025-04-29'
      },
      Q10: {
        questionId: 'Q10',
        questionText: 'How many employees do you have?',
        inputType: 'radio',
        options: [
          { text: '1-10', nextQuestionId: 'Q8' },
          { text: '11-50', nextQuestionId: 'Q8' },
          { text: '51-200', nextQuestionId: 'Q8' },
          { text: '201-1000', nextQuestionId: 'Q8' },
          { text: '1000+', nextQuestionId: 'Q8' },
        ],
        validationKey: 'no',
        requiresSubmitButton: true
      },
      
      Q8: {
        questionId: 'Q8',
        questionText: 'What services are you interested in?',
        inputType: 'buttons',
        options: [
          { text: 'Consulting', nextQuestionId: 'END' },
          { text: 'Software Development', nextQuestionId: 'END' },
          { text: 'Cloud Services', nextQuestionId: 'END' },
          { text: 'Support', nextQuestionId: 'END' },
        ],
      },
      END: {
        questionId: 'END',
        questionText:
          'Thank you for your responses! Is there anything else I can help you with?',
        inputType: 'buttons',
        options: [
          { text: 'Start Over', nextQuestionId: 'Q1' },
          { text: "No, I'm done", nextQuestionId: null },
        ],
      },
    },
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
    const initialQuestion =
      this.conversation.questions[this.conversation.currentQuestionId];
    this.currentQuestionSubject.next(initialQuestion);
    this.historySubject.next([]);
  }
}
