
import { Injectable } from '@angular/core';
import { BaseApiSettingsService } from './BaseApiSettings.service';

@Injectable()
export class ChatsApiSettingsService extends BaseApiSettingsService {
    

    chatsBaseUri = 'api/chats/';

    getDefaultChatsUri(): string{
        return this.defaultUrl + this.chatsBaseUri;
    }

}