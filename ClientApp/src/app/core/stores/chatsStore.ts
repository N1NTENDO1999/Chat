import { observable, computed, action, toJS } from "mobx";
import { Injectable } from '@angular/core';
import { ChatDto } from '../api/models';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ChatsStore {
    @observable chats: ChatDto[] = [];
    @observable selectedChat: ChatDto;
    private subject = new Subject<number>();

    selectedChatAdded(): Observable<number>{
        return this.subject.asObservable();
    }

    emitSubject(id: number){
        this.subject.next(id);
    }

    @computed get chat(): ChatDto {
        return toJS(this.selectedChat);
    }

    @computed get allChats(): ChatDto[] {
        return toJS(this.chats);
    }

    @computed get selectedChatId(): number {
        if (this.selectedChat) {
            return this.selectedChat.Id;
        }
        return -1;
    }

    @action MarkAsRead(chatId:number, isPersonal: boolean){
        var index = this.chats.findIndex(p => p.Id == chatId && p.IsPersonal == isPersonal);
        this.chats[index].UnreadMessagesCount = 0;
    }

    @action IncreaceUnreadCount(chatId: number, isPersonal: boolean){
       var index = this.chats.findIndex(p => p.Id == chatId && p.IsPersonal == isPersonal);
       this.chats[index].UnreadMessagesCount++;
    }

    @action setChats(chats: ChatDto[]) {
        this.chats = chats;
    }

    @action addChat(chat: ChatDto) {
        this.chats = [...this.chats, chat];
    }

    @action addSelectedChat(chat: ChatDto) {
        this.selectedChat = chat;
        this.emitSubject(this.selectedChat.Id);
    }

    @action clearSelected() {
        this.selectedChat = null;
    }

    @action clearchats() {
        this.chats = [];
    }
} 