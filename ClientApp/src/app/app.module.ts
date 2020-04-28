import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './core/services/Authentication.service';
import { BaseApiSettingsService } from './settings/BaseApiSettings.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatComponent } from './modules/chat/pages/chat.component';
import { ChatsSearchResultComponent } from './modules/chat/components/chats-search-result.component';
import { LoginComponent } from './shared/components/login.component';
import { AlertService } from './core/services/Alert.service';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { HeaderComponent } from './core/header/header.component';
import { AlertComponent } from './core/alert/alert.component';
import { RegisterComponent } from './core/register/register.component';
import { AuthGuard } from './core/helpers/auth.guard';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider} from "angularx-social-login";
import { ApiModule } from './core/api/api.module';
import { ChatDetailComponent } from './modules/chat/components/chat-details/chat-detail.component';
import { SignalrService } from './core/signalR/SignalR.service';
import { CreateChatComponent } from './modules/chat/pages/create-chat/create-chat.component';
import { ChatsStore } from './core/stores/chatsStore';
import { MessagesStore } from './core/stores/MessagesStore';
import { UsersSearchComponent } from './shared/components/users-search/users-search.component';
import { UsersStore } from './core/stores/UsersStore';
import { ScheduledMessagesComponent } from './shared/components/scheduled-messages/scheduled-messages.component';
import { ScheduledMessagesStore } from './core/stores/SchedluledMessagesStore';
import { UserDetailsComponent } from './shared/components/users/user-details/user-details.component';
import { ProfileEditComponent } from './shared/components/users/user-details/profile-edit/profile-edit.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MessageSearchComponent } from './modules/chat/pages/message-search/message-search.component';
import { MessagesSearchComponent } from './shared/components/messages/messages-search/messages-search.component';
import { MessagesSearchStore } from './core/stores/MessagesSearchStore';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UsersSearchPageComponent } from './modules/chat/pages/users-search-page/users-search-page.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("718282698881-d7qcm2riessqm92o9cup9o51fpf2ooi9.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatsSearchResultComponent,
    LoginComponent,
    HeaderComponent,
    AlertComponent,
    RegisterComponent,
    ChatDetailComponent,
    CreateChatComponent,
    UsersSearchComponent,
    ScheduledMessagesComponent,
    UserDetailsComponent,
    ProfileEditComponent,
    MessageSearchComponent,
    MessagesSearchComponent,
    UsersSearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule, 
    AngularFontAwesomeModule,
    SimpleNotificationsModule.forRoot(),
    ApiModule.forRoot({ rootUrl: "https://localhost:5001"}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    BaseApiSettingsService,
    SignalrService,
    ChatsStore,
    MessagesStore,
    UsersStore,
    ScheduledMessagesStore,
    MessagesSearchStore,
    AuthenticationService,
    AlertService,
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
