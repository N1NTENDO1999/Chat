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
import { HeaderComponent } from './core/header/header.component';
import { AlertComponent } from './core/alert/alert.component';
import { RegisterComponent } from './core/register/register.component';
import { UserService } from './core/http/User.service';
import { AuthGuard } from './core/helpers/auth.guard';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider} from "angularx-social-login";

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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ChatService,
    BaseApiSettingsService,
    AuthenticationService,
    AlertService,
    UserService,
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
