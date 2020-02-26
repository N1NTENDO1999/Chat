import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { ChatsApiSettingsService } from 'src/app/settings/ChatsApiSettings.service';
import { Observable } from 'rxjs';
import { Chat } from '../models/Chat';
import { AllChatsDTO } from './DTOs/AllChatsDTO';

@Injectable()
export class ChatService {

    constructor(
        private http: HttpClient,
        private config: ChatsApiSettingsService,
    ) { }

    private httpOptions = this.config.httpOptions
    
    getChats(): Observable<AllChatsDTO> {
        return this.http.get<AllChatsDTO>(this.config.getDefaultChatsUri());
      }

}