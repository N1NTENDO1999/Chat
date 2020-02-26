import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatService } from './core/http/Chat.service';
import { AuthenticationService } from './core/services/Authentication.service';
import { BaseApiSettingsService } from './settings/BaseApiSettings.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatComponent } from './modules/chat/pages/chat.component';
import { ChatsSearchResultComponent } from './modules/chat/components/chats-search-result.component';
import { LoginComponent } from './shared/components/login.component';
import { AlertService } from './core/services/Alert.service';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor } from './core/helpers/error.interceptor';

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
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ChatService,
    BaseApiSettingsService,
    AuthenticationService,
    AlertService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
