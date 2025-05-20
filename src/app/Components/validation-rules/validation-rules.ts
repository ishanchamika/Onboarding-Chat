export interface ValidationRule {
    pattern: RegExp;
    message: string;
  }
  
  export const ValidationRules: { [key: string]: ValidationRule } = {
    identityNumber: {
      pattern: /^[0-9]{12}$/,
      message: 'ID number must be exactly 12 digits.',
    },
    name: {
      pattern: /^[A-Za-z ]+$/,
      message: 'Name can only contain letters and spaces.',
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address.',
    },
    phone: {
      pattern: /^[0-9]{10}$/,
      message: 'Phone number must be 10 digits.',
    },
    salary: {
        pattern: /^[0-9]{1,10}$/,
        message: 'Please enter valid amount'
    }
  };
  