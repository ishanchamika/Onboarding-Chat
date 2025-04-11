import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../Models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {
  private apiUrl = 'https://your-api-endpoint.com/conversations';
  
  constructor(private http: HttpClient) {}
  
  getConversation(conversationId: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/${conversationId}`);
  }
}