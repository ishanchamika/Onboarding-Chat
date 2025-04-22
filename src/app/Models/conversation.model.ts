export type QuestionType = 'text' | 'number' | 'radio' | 'dropdown' | 'buttons' | 'calendar'; // 'selection' mapped to 'buttons'

export interface Option {
  text: string;
  value?: string | number; // Optional value if different from text
  nextQuestionId: string | null; // Changed from next: Question | null
}

export interface Question {
  questionId: string; // Changed from id
  questionText: string; // Changed from question
  inputType: QuestionType; // Changed from type
  options?: Option[]; // For radio, dropdown, buttons
  placeholder?: string; // For text and number inputs
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  customValidation?:any;
  validationKey?:string;
  nextQuestionId?: string | null; // Changed from next: Question | null, used for text/number inputs
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

// Answer interface unchanged, included for completeness
export interface Answer {
  type: QuestionType;
  value: string | number | Option;
}