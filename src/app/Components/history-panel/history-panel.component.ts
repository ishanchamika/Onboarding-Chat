import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryItem } from '../../Models/conversation.model';
import { ConversationService } from '../../Services/conversation.service';

@Component({
  selector: 'app-history-panel',
  standalone: false,
  templateUrl: './history-panel.component.html',
  styleUrl: './history-panel.component.css'
})
export class HistoryPanelComponent implements OnInit {
  history$: Observable<HistoryItem[]>;

  constructor(private conversationService: ConversationService) {
    this.history$ = this.conversationService.history$;
  }

  ngOnInit(): void {}

}
