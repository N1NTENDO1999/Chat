import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../models/Chat';
import { AllChatsDTO } from './DTOs/AllChatsDTO';
import { BaseApiSettingsService } from 'src/app/settings/BaseApiSettings.service';

@Injectable()
export class ChatService {

    constructor(
        private http: HttpClient,
        private config: BaseApiSettingsService,
    ) { }

    private httpOptions = this.config.httpOptions
    
    getChats(): Observable<AllChatsDTO> {
        return this.http.get<AllChatsDTO>(this.config.defaultUrl + 'api/chats');
      }

}