import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Question,
  HistoryItem,
  Option,
  QuestionType,
  Conversation,
} from '../Models/conversation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {

  private pausedQuestionId: string | null = null;
  private conversation : Conversation | null = null;
  private currentQuestionSubject = new BehaviorSubject<Question|null>(null);
  private historySubject = new BehaviorSubject<HistoryItem[]>([]);

  constructor(private http : HttpClient) 
  {
  }

  get currentQuestion$(): Observable<Question|null> {
    return this.currentQuestionSubject.asObservable();
  }

  get currentQuestion(): Question | null {
    return this.currentQuestionSubject.getValue();
  }

  get history$(): Observable<HistoryItem[]> {
    return this.historySubject.asObservable();
  }

  //_________Initially call endpoint & create IndexedDB databases_______
  async loadConversation(conversationId: string): Promise<void> 
  {

    try 
    {
      // this.initializeProgressDB();
      // this.initializeAnswerDB();
      this.loadAnswersFromIndexedDB();
      this.conversation  = await this.getConversationFromIndexedDB(conversationId);
      this.pausedQuestionId = await this.getCurrentQuestionId(conversationId);
   
      if(this.conversation  !== null)
      {
        if(this.pausedQuestionId !== null)
        {
          this.loadQuestionFromIndexedDB(this.conversation.conversationId, this.pausedQuestionId);
        }
        else
        {
          this.loadQuestionFromIndexedDB(this.conversation.conversationId, this.conversation.currentQuestionId);
        }
      }
      else
      {
        this.conversation = await this.http.get<any>('http://localhost:5149/api/Conversation/' + conversationId).toPromise() ?? null;
        if(this.conversation) 
        {
          this.storeConversationInIndexedDB(this.conversation);
          if(this.pausedQuestionId !== null)
          {
            this.loadQuestionFromIndexedDB(this.conversation.conversationId, this.pausedQuestionId);
          }
          else
          {
            this.loadQuestionFromIndexedDB(this.conversation.conversationId, this.conversation.currentQuestionId);
          }
        }
        else 
        {
          console.error('No conversation data received from the backend');
        }
      }
    } 
    catch (error) 
    {
      console.error('Error fetching conversation:', error);
    }
  }

  handleAnswer(answer: any, question: any): void {
    this.storeAnswers(answer, question);
    const current = this.currentQuestion;
    if (!current || !this.conversation) {
      console.error('Conversation or current question not loaded');
      return;
    }
    let answerText: string;
    let nextQuestionId: string | null = null;

    if (answer.type === 'file') {
      answerText = answer.text;
      nextQuestionId = answer.nextQuestionId || null;
      const historyItems = this.historySubject.getValue();
      historyItems.push({
        question: current.questionText || '',
        answer: answerText,
      });
      console.log("history", historyItems)
      this.historySubject.next(historyItems);
    } else {
      // Existing logic for other answer types
      if (answer.type === 'dropdown') {
        answerText = answer.text.text.toString();
        nextQuestionId = answer.text.nextQuestionId || null;
      } else if (answer.type === 'calender') {
        answerText = answer.text.toLocaleDateString();
        nextQuestionId = answer.nextQuestionId || null;
      } else if (answer.type === 'input') {
        answerText = answer.text.toString();
        nextQuestionId = answer.nextQuestionId || null;
      } else if (answer.type === 'button') {
        answerText = answer.text.text;
        nextQuestionId = answer.text.nextQuestionId || null;
      } else if (answer.type === 'radio') {
        answerText = answer.text.text;
        nextQuestionId = answer.text.nextQuestionId || null;
      } else if (answer.type === 'checkbox') {
        answerText = answer.text;
        nextQuestionId = answer.value[0].nextQuestionId || null;
      } else {
        answerText = answer.text;
        nextQuestionId = answer.nextQuestionId;
      }

      const historyItems = this.historySubject.getValue();
      historyItems.push({ question: current.questionText || '', answer: answerText });
      this.historySubject.next(historyItems);
    }

    if (nextQuestionId && this.conversation?.conversationId) {
      this.loadQuestionFromIndexedDB(this.conversation.conversationId, nextQuestionId);
    } else {
      const endQuestion: Question = {
        questionId: 'final',
        questionText: 'Conversation ended. Thank you!',
        inputType: 'buttons',
        options: [{ text: 'Start Over', nextQuestionId: this.conversation.currentQuestionId }],
        requiresSubmitButton: false
      };
      this.currentQuestionSubject.next(endQuestion);
    }
  }

  // handleAnswer(answer: any, question:any): void 
  // {
  //   this.storeAnswers(answer, question);
  //   const current = this.currentQuestion;
  //   if(!current || !this.conversation) 
  //   {
  //     console.error('Conversation or current question not loaded');
  //     return;
  //   }
  //   let answerText: string;
  //   let nextQuestionId: string | null = null;

  //   // answerText = answer.toLocaleDateString();
  //   // Handle different answer types
  //   if(answer.type == 'dropdown') {
  //     answerText = answer.text.text.toString()  ;
  //     nextQuestionId = answer.text.nextQuestionId || null;
  //   } 
  //   else if(answer.type == 'calender') {
  //     answerText = answer.text.toLocaleDateString();
  //     nextQuestionId = answer.nextQuestionId || null;
  //   }
  //   else if (answer.type == 'input') {
  //     answerText = answer.text.toString();
  //     nextQuestionId = answer.nextQuestionId || null;
  //   } 
  //   else if (answer.type=='button') {
  //     answerText = answer.text.text;
  //     nextQuestionId = answer.text.nextQuestionId || null;
  //   } 
  //   else if (answer.type=='radio') {
  //     answerText = answer.text.text;
  //     nextQuestionId = answer.text.nextQuestionId || null;
  //   } 
  //   else if (answer.type=='checkbox') {
  //     answerText = answer.text;
  //     nextQuestionId = answer.value[0].nextQuestionId || null;
  //   }else if(current.inputType === 'file' ){
  //     answerText = answer.text;
  //     nextQuestionId = current.nextQuestionId || null;
  //   }
  //   else {
  //     answerText = answer.text;
  //     nextQuestionId = answer.nextQuestionId;
  //   }

  //   // Add to history
  //   const historyItems = this.historySubject.getValue();
  //   historyItems.push({ question: current.questionText || '', answer: answerText });
  //   this.historySubject.next(historyItems);

  //   // Set next question if available
  //   if(nextQuestionId && this.conversation?.conversationId) 
  //   {
  //     this.loadQuestionFromIndexedDB(this.conversation.conversationId, nextQuestionId);
  //   } 
  //   else 
  //   {
  //     // End of conversation path
  //     const endQuestion: Question = {
  //       questionId: 'final',
  //       questionText: 'Conversation ended. Thank you!',
  //       inputType: 'buttons',
  //       options: [
  //         {
  //           text: 'Start Over',
  //           nextQuestionId: this.conversation.currentQuestionId,
  //         },
  //       ],
  //       requiresSubmitButton: false
  //     };
  //     this.currentQuestionSubject.next(endQuestion);
  //   }
  // }

  resetConversation(): void {
    if(!this.conversation) 
    {
      console.error('Conversation not loaded');
      return;
    }
    const initialQuestion = this.conversation.questions[this.conversation.currentQuestionId];
    this.currentQuestionSubject.next(initialQuestion);
    this.historySubject.next([]);
  }


  //____________Store conversation json into IndexedDB from API call___________
  storeConversationInIndexedDB(conversation: any) : void
  {
    const request = indexedDB.open('ConversationDB', 1);
  
    request.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('conversations')) {
        db.createObjectStore('conversations', { keyPath: 'conversationId' });
      }
    };
  
    request.onsuccess = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction('conversations', 'readwrite');
      const store = transaction.objectStore('conversations');
      store.put(conversation);
  
      transaction.oncomplete = function () {
        console.log('Conversation stored successfully!');
      };
  
      transaction.onerror = function () {
        console.error('Error storing conversation:', transaction.error);
      };
    };
  
    request.onerror = function () {
      console.error('Error opening database:', request.error);
    };
  }


  //__________________Store Ques. & Answers into IndexedDB___________________
  storeAnswers(answer: any, question:any): void 
  {
    const request = indexedDB.open('AnswerDB', 1);
  
    request.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
  
      // Create object store with 'currentQID' as the key
      if (!db.objectStoreNames.contains('answers')) {
        db.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
      }
    };
  
    request.onsuccess = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['answers'], 'readwrite');
      const store = transaction.objectStore('answers');
  
      const data = {
        currentQID: answer.currentQID,
        Question: question.questionText,
        value: answer.value,
        type: answer.type
      };
  
      const addRequest = store.add(data); // put will add or update by key
  
      addRequest.onsuccess = function () {
        console.log('Answer stored successfully:', data);
      };
  
      addRequest.onerror = function (err) {
        console.error('Error storing answer:', err);
      };
    };
  
    request.onerror = function (err) {
      console.error('Error opening IndexedDB:', err);
    };
  }
  

  //____________Load answers from IndexedDB_______________
  loadAnswersFromIndexedDB(): void 
  {
    const request = indexedDB.open('AnswerDB', 1);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['answers'], 'readonly');
      const store = transaction.objectStore('answers');
      
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        const storedAnswers = getAllRequest.result;
        let fileData: { fileName: string; fileType: string; dataUrl: string } | undefined;
        const history: { question: string; answer: string }[] = storedAnswers.map((item: any) => 
        {
          let formattedAnswer: string;
        
          if(!item.value){
            formattedAnswer = '';
          }
          else if(item.type === 'file'){
              formattedAnswer = `File uploaded: ${item.value.fileName}`;
              // fileData = {
              // fileName: item.value.fileName,
              // fileType: item.value.fileType,
              // dataUrl: item.value.dataUrl
              // }
              console.log('qqwwee',formattedAnswer)
            } 
          else if(item.type === 'radio' || item.type === 'dropdown' || item.type === 'button'){
            formattedAnswer = item.value.text;
          } 
          else if (item.type === 'calender') {
            formattedAnswer = item.value.toLocaleDateString();
          }
          else if (item.type === 'checkbox') {
            formattedAnswer = item.value.map((opt: { text: string }) => opt.text).join(', ');
          }
          else if (item.type === 'secondary'){
            formattedAnswer = Object.entries(item.value).map(([key, val]) => `${key.split('-').pop()}: ${val}`).join(', ');
          } 
          
          else {
            formattedAnswer = String(item.value);
          }
          return {
            question: item.Question,
            answer: formattedAnswer
          };
        });
        
  
        // Push loaded history to BehaviorSubject
        this.historySubject.next(history);
      };
  
      getAllRequest.onerror = (err) => {
        console.error('Error retrieving answers from IndexedDB:', err);
      };
    };
  
    request.onerror = (err) => {
      console.error('Error opening IndexedDB:', err);
    };
  }

  

  //____________________Load current question object from indexedDB________________________
  async loadQuestionFromIndexedDB(conversationId: string, questionId: string): Promise<void> 
  {
    this.storeCurrentQuestionId(conversationId, questionId); //if loaded the question, immediately store into indexedDB
    const request = indexedDB.open('ConversationDB', 1);
  
    request.onsuccess = (event) => 
    {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction('conversations', 'readonly');
      const store = transaction.objectStore('conversations');
      const getRequest = store.get(conversationId);
  
      getRequest.onsuccess = () => 
      {
        const storedConversation = getRequest.result;
        if(storedConversation && storedConversation.questions && storedConversation.questions[questionId]) 
        {
          const question = storedConversation.questions[questionId];
          this.currentQuestionSubject.next(question);
        } 
        else 
        {
          console.log('Question not found in IndexedDB');
        }
      };
  
      getRequest.onerror = () => {
        console.log('Error retrieving conversation from IndexedDB:', getRequest.error);
      };
    };
  
    request.onerror = () => {
      console.log('Error opening database:', request.error);
    };
  }
  


  //________________Initially load conversation json from IndexedDB If Exist_______________
  getConversationFromIndexedDB(conversationId: string): Promise<any | null> 
  {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('ConversationDB', 1);
  
      request.onupgradeneeded = function () {
        console.warn('DB did not exist, returning null without creating.');
        request.transaction?.abort(); // cancel DB creation
        resolve(null);
      };
  
      request.onsuccess = function (event) 
      {
        const db = (event.target as IDBOpenDBRequest).result;
  
        if(!db.objectStoreNames.contains('conversations')) 
        {
          resolve(null);
          return;
        }
  
        const transaction = db.transaction('conversations', 'readonly');
        const store = transaction.objectStore('conversations');
        const getRequest = store.get(conversationId);
  
        getRequest.onsuccess = () => {
          resolve(getRequest.result ?? null);
        };
  
        getRequest.onerror = () => {
          console.error('Error retrieving conversation from IndexedDB:', getRequest.error);
          reject(getRequest.error);
        };
      };
  
      request.onerror = () => {
        console.error('Error opening ConversationDB:', request.error);
        reject(request.error);
      };
    });
  }
  


  //________Store current QuestionId for afterUse(getCurrentQuestionId)____________
  storeCurrentQuestionId(conversationId: string, questionId: string): void 
  {
    const dbVersion = 2;
    const request = indexedDB.open('ProgressDB', dbVersion);
  
    request.onupgradeneeded = (event) => 
    {
      const db = (event.target as IDBOpenDBRequest).result;
  
      if(!db.objectStoreNames.contains('progress')) 
      {
        const store = db.createObjectStore('progress', { keyPath: 'id' });
        console.log('Created object store: progress');
      }
    };
  
    request.onsuccess = function (event) 
    {
      const db = (event.target as IDBOpenDBRequest).result;
  
      if(!db.objectStoreNames.contains('progress')) 
      {
        console.error("'progress' object store not found, even after upgrade.");
        return;
      }
  
      const transaction = db.transaction('progress', 'readwrite');
      const store = transaction.objectStore('progress');

      store.put({ id: conversationId, conversationId, questionId });
  
      transaction.oncomplete = () => {
        console.log('Progress stored successfully.');
      };
  
      transaction.onerror = () => {
        console.error('Error storing progress:', transaction.error);
      };
    };
  
    request.onerror = () => {
      console.error('Error opening ProgressDB:', request.error);
    };
  }
  
  
  


  //__________load last partially answered question(if reloaded)___________
  getCurrentQuestionId(conversationId: string): Promise<string | null> 
  {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('ProgressDB', 2);
  
      request.onsuccess = function(event) 
      {
        const db = (event.target as IDBOpenDBRequest).result;
  
        if(!db.objectStoreNames.contains('progress')) 
        {
          resolve(null);
          return;
        }
  
        const transaction = db.transaction('progress', 'readonly');
        const store = transaction.objectStore('progress');
        const getRequest = store.get(conversationId);
  
        getRequest.onsuccess = () => {
          resolve(getRequest.result?.questionId ?? null);
        };
  
        getRequest.onerror = () => {
          console.error('Error getting progress:', getRequest.error);
          reject(getRequest.error);
        };
      };
  
      request.onerror = () => {
        console.error('Error opening ProgressDB:', request.error);
        reject(request.error);
      };
    });
  }

  

  //___________Initially create Indexed db to store current QID___________
  initializeProgressDB(): void 
  {
    const dbVersion = 1;
    const request = indexedDB.open('ProgressDB', dbVersion);
  
    request.onupgradeneeded = (event) => 
    {
      const db = (event.target as IDBOpenDBRequest).result;
  
      if(!db.objectStoreNames.contains('progress')) 
      {
        db.createObjectStore('progress', { keyPath: 'id', autoIncrement: true });
      }
    };
  
    request.onsuccess = () => {
      request.result.close();
    };
  
    request.onerror = () => {
      console.error('Failed to initialize ProgressDB:', request.error);
    };
  }
  
  initializeAnswerDB(): void 
  {
    const dbVersion = 1;
    const request = indexedDB.open('AnswerDB', dbVersion);
  
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
  
      if (!db.objectStoreNames.contains('answers')) {
        db.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
        console.log('Object store "answers" created.');
      }
    };
  
    request.onsuccess = () => {
      request.result.close();
      console.log('AnswerDB initialized successfully.');
    };
  
    request.onerror = () => {
      console.error('Failed to initialize AnswerDB:', request.error);
    };
  }
  
}
