import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'chats', component: ChatComponent},
];

import { ChatService } from './core/http/Chat.service';

import { ChatComponent } from './modules/chat/pages/chat.component';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
