import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HistoryItem } from '../../Models/conversation.model';

@Component({
  selector: 'app-history-panel',
  standalone: false,
  templateUrl: './history-panel.component.html',
  styleUrl: './history-panel.component.css'
})
export class HistoryPanelComponent implements OnChanges 
{
  @Input() history: HistoryItem[] = [];
  displayHistory: HistoryItem[] = [];
  showFullHistory = false;
  
  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['history']) {
      // Keep only the last 3 items for condensed view
      this.updateDisplayHistory();
    }
  }
  
  updateDisplayHistory(): void {
    if (this.showFullHistory || this.history.length <= 3) {
      this.displayHistory = [...this.history];
    } else {
      this.displayHistory = this.history.slice(-3);
    }
  }
  
  toggleHistoryView(): void {
    this.showFullHistory = !this.showFullHistory;
    this.updateDisplayHistory();
  }
  
  getFormattedTime(date: Date): string {
    return date instanceof Date 
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : '';
  }
}
