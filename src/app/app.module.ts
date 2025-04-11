// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Add this import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './Components/chat/chat.component';
import { HistoryPanelComponent } from './Components/history-panel/history-panel.component';
import { TextInputComponent } from './Components/question-types/text-input/text-input.component';
import { NumberInputComponent } from './Components/question-types/number-input/number-input.component';
import { RadioInputComponent } from './Components/question-types/radio-input/radio-input.component';
import { DropdownInputComponent } from './Components/question-types/dropdown-input/dropdown-input.component';
import { ButtonsInputComponent } from './Components/question-types/buttons-input/buttons-input.component';
import { SelectionInputComponent } from './Components/question-types/selection-input/selection-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HistoryPanelComponent,
    TextInputComponent,
    NumberInputComponent,
    RadioInputComponent,
    DropdownInputComponent,
    ButtonsInputComponent,
    SelectionInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule  // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }