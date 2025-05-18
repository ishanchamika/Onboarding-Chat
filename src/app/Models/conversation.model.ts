export type QuestionType = 'text' | 'number' | 'radio' | 'dropdown' | 'buttons' | 'calendar' | 'datepicker' | 'checkbox' |'secondary';

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
  nextQuestionId?: string | null; 
  subQuestion?: { [key: string]: Question };
  requiresSubmitButton?: boolean;
  layoutColumn?: number;
  validationKey?: string;
  minDate?: string;
  maxDate?: string;
  mincheck?: string;
  maxcheck?: string;
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