export type QuestionType = 'text' | 'number' | 'radio' | 'dropdown' | 'buttons' | 'calendar' | 'datepicker' | 'address';

export interface Option {
  text: string;
  value?: string | number;
  nextQuestionId?: string | null; 
}

export interface Question {
  questionId: string; 
  questionText?: string; 
  inputType: QuestionType; 
  options?: Option[]; 
  placeholder?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  customValidation?:any;
  validationKey?:string;
  nextQuestionId?: string | null; 
  subQuestions?: { [key: string]: Question };
  requiresSubmitButton?: boolean;
}

export interface Conversation {
  conversationId: string;
  currentQuestionId: string;
  questions: { [key: string]: Question };
}

export interface HistoryItem {
  question: string;
  answer: string;
}

export interface Answer {
  type: QuestionType;
  value: string | number | Option;
}