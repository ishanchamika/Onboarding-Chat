export type QuestionType = 'text' | 'number' | 'radio' | 'dropdown' | 'buttons';

export interface Option {
  text: string;
  value?: string | number; // Optional value if different from text
  next: Question | null;
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: Option[];  // Required for radio, dropdown, and buttons
  placeholder?: string; // For text and number inputs
  validation?: {        // Optional validation rules
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  next?: Question | null; // For text/number inputs that always go to the same next question
}

export interface HistoryItem {
  question: string;
  answer: string;
}

export interface Answer {
  type: QuestionType;
  value: string | number | Option;
}