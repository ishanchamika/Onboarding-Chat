import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import * from '../assets/environment.json'

export interface CustomEnvironment {
  PORT: string;
  CONVERSATION_ID: string;
  BASE_URL: string;
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService 
{
  private configUrl = 'assets/environment.json';
  constructor(private http: HttpClient) { }

  getConfig(): Observable<CustomEnvironment>
  {
    console.log('retun one', this.http.get<CustomEnvironment>(this.configUrl));
    return this.http.get<CustomEnvironment>(this.configUrl);
  }
}
