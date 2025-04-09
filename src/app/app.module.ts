import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './Components/chat/chat.component';
import { HistoryPanelComponent } from './Components/history-panel/history-panel.component';
import { ConversationComponent } from './Components/conversation/conversation.component';
import { TextInputComponent } from './Components/question-types/text-input/text-input.component';
import { NumberInputComponent } from './Components/question-types/number-input/number-input.component';
import { RadioInputComponent } from './Components/question-types/radio-input/radio-input.component';
import { DropdownInputComponent } from './Components/question-types/dropdown-input/dropdown-input.component';
import { ButtonsInputComponent } from './Components/question-types/buttons-input/buttons-input.component';

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
    ButtonsInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }