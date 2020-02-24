import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { ChatsApiSettingsService } from 'src/app/settings/ChatsApiSettings.service';
import { Observable } from 'rxjs';
import { Chat } from '../models/Chat';

@Injectable()
export class ChatService {

    

    constructor(
        private http: HttpClient,
        private config: ChatsApiSettingsService,
        private httpOptions = config.httpOptions
    ) { }
   
    getChats(): Observable<Chat []> {
        //TODO: Create Component to show all chats
        return this.http.get<Chat []>(this.config.getDefaultChatsUri());
      }

}