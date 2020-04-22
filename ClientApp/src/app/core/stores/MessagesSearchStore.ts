import { observable, computed, action, toJS } from "mobx";
import { Injectable, Output } from '@angular/core';
import { MessageDto } from '../models/MessageDto';
import { EventEmitter } from 'protractor';
import { Subject, Observable } from 'rxjs';
import { ChatMessageDto, SearchedPersonalMessageDto } from '../api/models';

@Injectable()
export class MessagesSearchStore {
    @observable private chatMessages: ChatMessageDto[] = [];
    @observable private personalMessages: SearchedPersonalMessageDto[] = [];

    @computed get ChatMessages(): ChatMessageDto[] {
        return toJS(this.chatMessages);
    }

    @computed get PersonalMessages(): SearchedPersonalMessageDto[] {
        return toJS(this.personalMessages);
    }

    @action SetChatMessages(messages: ChatMessageDto[]) {
        this.chatMessages = [...messages];
    }

    @action SetPersonalMessages(messages: SearchedPersonalMessageDto[]) {
        this.personalMessages = [...messages];
    }

    @action Clear() {
        this.personalMessages = [];
        this.chatMessages = [];
    }

}