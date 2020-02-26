import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'chats', component: ChatComponent },
  { path: 'login', component: LoginComponent }
];

import { ChatComponent } from './modules/chat/pages/chat.component';
import { LoginComponent } from './shared/components/login.component';

import { AuthenticationService } from './core/services/Authentication.service';

import { UserService } from './core/http/User.service';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
