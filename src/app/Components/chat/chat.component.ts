import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question, Option } from '../../Models/conversation.model';
import { ConversationService } from '../../Services/conversation.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentQuestion$: Observable<Question>;
  selectedOption: Option | null = null;
  messages: {type: 'bot' | 'user', text: string}[] = [];

  constructor(private conversationService: ConversationService) 
  {
    this.currentQuestion$ = this.conversationService.currentQuestion$;
  }

  ngOnInit(): void 
  {
    this.currentQuestion$.subscribe(question => 
    {
      if(this.messages.length === 0 || this.messages[this.messages.length - 1].text !== question.question) 
      {
        this.messages.push({type: 'bot', text: question.question});
      }
    });
  }

  selectOption(option: Option): void 
  {
    this.selectedOption = option;
  }

  confirmSelection(): void 
  {
    if(this.selectedOption) 
    {
      const selectedOption = this.selectedOption;
      
      this.messages.push({ type: 'user', text: selectedOption.text });
  
      this.conversationService.selectOption(selectedOption);
      
      if(!selectedOption.next) 
      {
        setTimeout(() => 
        {
          this.messages.push({ type: 'bot', text: 'Thank you for your response! Is there anything else I can help you with?' });
        }, 500);
      }
      this.selectedOption = null;
    }
  }

  trackByFn(index: number): number 
  {
    return index;
  }
}