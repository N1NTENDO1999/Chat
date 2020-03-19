import { observable, computed, action } from "mobx";
import { Injectable } from '@angular/core';
import { ChatDto } from '../api/models';

@Injectable()
export class ChatsStore {
    @observable chats: ChatDto[] = [];
    @observable selectedChat: ChatDto;

    @computed get chat() {
        return this.selectedChat;
    }

    @action setChats(chats: ChatDto[]){
        console.log(chats);
        this.chats = chats;
    }
} 