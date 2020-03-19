import { observable, computed, action } from "mobx";
import { Injectable } from '@angular/core';
import { ChatDto } from '../api/models';

@Injectable()
export class ChatsStore{
    @observable chats: ChatDto[] = [];
    @observable selectedChat: ChatDto;
} 