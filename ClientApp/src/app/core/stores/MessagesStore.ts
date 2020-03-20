import { observable, computed, action, toJS } from "mobx";
import { Injectable } from '@angular/core';
import { MessageDto } from '../models/MessageDto';

@Injectable()
export class MessagesStore{
    @observable messages: MessageDto[] = [];

    @computed get allMessages(): MessageDto[]{
        return toJS(this.messages);
    }

    @action addMessage(value: MessageDto){
        this.messages = [...this.messages, value];
    }

    @action setMessages(messages: MessageDto[]){
        this.messages = [...messages];
    }

    @action clearMessages(){
        this.messages = [];
    }
}