import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'chats', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: CreateChatComponent, canActivate: [AuthGuard] },
  { path: 'search/user', component: UsersSearchComponent, canActivate: [AuthGuard] },
  { path: 'scheduled', component: ScheduledMessagesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'search/messages', component: MessageSearchComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'chats' }
];

import { ChatComponent } from './modules/chat/pages/chat.component';
import { LoginComponent } from './shared/components/login.component';
import { RegisterComponent } from './core/register/register.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { ChatDetailComponent } from './modules/chat/components/chat-details/chat-detail.component';

import { SignalrService } from './core/signalR/SignalR.service';
import { CreateChatComponent } from './modules/chat/pages/create-chat/create-chat.component';
import { UsersSearchComponent } from './shared/components/users-search/users-search.component';
import { ScheduledMessagesComponent } from './shared/components/scheduled-messages/scheduled-messages.component';
import { UserDetailsComponent } from './shared/components/users/user-details/user-details.component';
import { ProfileEditComponent } from './shared/components/users/user-details/profile-edit/profile-edit.component';
import { MessageSearchComponent } from './modules/chat/pages/message-search/message-search.component';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
