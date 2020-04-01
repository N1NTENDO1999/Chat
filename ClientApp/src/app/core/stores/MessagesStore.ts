import { observable, computed, action, toJS } from "mobx";
import { Injectable } from '@angular/core';
import { MessageDto } from '../models/MessageDto';

@Injectable()
export class MessagesStore{
    @observable messages: MessageDto[] = [];
    @observable private first: number = 0;
    @observable private last: number = 20;

    @computed get allMessages(): MessageDto[]{
        return toJS(this.messages);
    }

    @computed get First(): number{
        return this.first;
    }

    @computed get Last(): number{
        return this.last;
    }

    @action addMessage(value: MessageDto){
        this.messages = [...this.messages, value];
        this.first++;
        this.last++;
    }

    @action setMessages(messages: MessageDto[]){
        this.messages = [...this.messages,...messages];
        this.first += 20;
        this.last += 20;
    }

    @action clearMessages(){
        this.messages = [];
        this.first = 0;
        this.last = 20;
    }
}