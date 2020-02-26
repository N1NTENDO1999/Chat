import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatService } from './core/http/Chat.service';
import { BaseApiSettingsService } from './settings/BaseApiSettings.service';
import { ChatsApiSettingsService } from './settings/ChatsApiSettings.service';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './modules/chat/pages/chat.component';
import { ChatsSearchResultComponent } from './modules/chat/components/chats-search-result.component';
import { LoginComponent } from './shared/components/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatsSearchResultComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    ChatService,
    BaseApiSettingsService,
    ChatsApiSettingsService,
    ChatService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
