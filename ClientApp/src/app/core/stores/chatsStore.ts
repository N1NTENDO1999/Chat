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

    @computed get allChats(){
        return this.chats;
    }

    @computed get selectedChatId(){
        return this.selectedChat.Id;
    }

    @action setChats(chats: ChatDto[]) {
        console.log(chats);
        this.chats = chats;
    }

    @action selectChat(chat: ChatDto) {
        this.selectedChat = chat;
    }

    @action clearSelected(){
        this.selectedChat = null;
    }

    @action clearchats(){
        this.chats = [];
    }
} 