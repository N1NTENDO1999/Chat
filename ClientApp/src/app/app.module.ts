import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatService } from './core/http/Chat.service';
import { BaseApiSettingsService } from './settings/BaseApiSettings.service';
import { ChatsApiSettingsService } from './settings/ChatsApiSettings.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ChatService,
    BaseApiSettingsService,
    ChatsApiSettingsService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
