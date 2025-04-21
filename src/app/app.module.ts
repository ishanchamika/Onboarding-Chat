import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { ChatComponent } from './Components/chat/chat.component';
import { HistoryPanelComponent } from './Components/history-panel/history-panel.component';
import { ConversationComponent } from './Components/conversation/conversation.component';
import { TextInputComponent } from './Components/question-types/text-input/text-input.component';
import { NumberInputComponent } from './Components/question-types/number-input/number-input.component';
import { RadioInputComponent } from './Components/question-types/radio-input/radio-input.component';
import { DropdownInputComponent } from './Components/question-types/dropdown-input/dropdown-input.component';
import { ButtonsInputComponent } from './Components/question-types/buttons-input/buttons-input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CalendarInputComponent } from './Components/question-types/calendar-input/calendar-input.component';
import { AddressInputComponent } from './Components/question-types/address-input/address-input.component';
import { SubmitButtonComponent } from './Components/question-types/submit-button/submit-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HistoryPanelComponent,
    ConversationComponent,
    TextInputComponent,
    NumberInputComponent,
    RadioInputComponent,
    DropdownInputComponent,
    ButtonsInputComponent,
    CalendarInputComponent,
    AddressInputComponent,
    SubmitButtonComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,

    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }