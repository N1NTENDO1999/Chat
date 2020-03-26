import { observable, computed, action, toJS } from "mobx";
import { Injectable } from '@angular/core';
import { ChatDto } from '../api/models';
import { ScheduledMessageDto } from '../models/ScheduledMessageDto';

@Injectable()
export class ScheduledMessagesStore {
    @observable messages: ScheduledMessageDto[] = [];

    @computed get allMessages() {
        return toJS(this.messages);
    }

    @action setMessages(messages: ScheduledMessageDto[]) {
        this.messages = [...messages];
    }

    @action clearMessages() {
        this.messages = [];
    }
}