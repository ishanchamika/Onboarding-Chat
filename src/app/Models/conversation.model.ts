export interface Option {
    text: string;
    next: Question | null;
  }
  
  export interface Question {
    id: string;
    question: string;
    options: Option[];
  }
  
  export interface HistoryItem {
    question: string;
    answer: string;
  }