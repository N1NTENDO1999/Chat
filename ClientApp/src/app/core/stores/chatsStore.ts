import { observable, computed, action, toJS } from "mobx";
import { Injectable } from '@angular/core';
import { ChatDto } from '../api/models';

@Injectable()
export class ChatsStore {
    @observable chats: ChatDto[] = [];
    @observable selectedChat: ChatDto;
    
    @computed get chat(): ChatDto {
        return toJS(this.selectedChat);
    }

    @computed get allChats(): ChatDto[]{
        return toJS(this.chats);
    }

    @computed get selectedChatId(): number{
        return this.selectedChat.Id;
    }

    @action setChats(chats: ChatDto[]) {
        this.chats = chats;
    }

    @action selectChat(chatId: number) {
        console.log(toJS(this.chats.find(p => p.Id == chatId )));
        this.selectedChat = this.chats.find(p => p.Id == chatId );
    }

    @action clearSelected(){
        this.selectedChat = null;
    }

    @action clearchats(){
        this.chats = [];
    }
} 