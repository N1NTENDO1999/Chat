import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatService } from './core/http/Chat.service';
import { AuthenticationService } from './core/services/Authentication.service';
import { BaseApiSettingsService } from './settings/BaseApiSettings.service';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './modules/chat/pages/chat.component';
import { ChatsSearchResultComponent } from './modules/chat/components/chats-search-result.component';
import { LoginComponent } from './shared/components/login.component';
import { AlertService } from './core/services/Alert.service';

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
    AuthenticationService,
    AlertService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
