// src/app/models/conversation.model.ts
export type InputType = 'text' | 'number' | 'selection' | 'radio' | 'dropdown' | 'buttons';

export interface Option {
  text: string;
  value?: string | number;
  nextQuestionId: string | null;
}

export interface Question {
  questionId: string;
  questionText: string;
  inputType: InputType;
  options?: Option[];
  placeholder?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  nextQuestionId?: string | null;
}

export interface Conversation {
  conversationId: string;
  questions: { [key: string]: Question };
  currentQuestionId: string;
}

export interface HistoryItem {
  questionId: string;
  questionText: string;
  answer: string;
  timestamp: Date;
}