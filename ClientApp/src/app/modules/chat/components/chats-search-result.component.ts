import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/core/models/Chat';
import { ChatService } from 'src/app/core/http/Chat.service';
import { AllChatsDTO } from 'src/app/core/http/DTOs/AllChatsDTO';

@Component({
    selector: 'chats-search-result-component',
    templateUrl: './chats-search-result.component.html',
    styleUrls: ['./chats-search-result.component.css']
})
export class ChatsSearchResultComponent implements OnInit {

    public allChats: Chat[];

    constructor(
        private chatService: ChatService
    ) { }

    getAllChats(): void {
        
    }

    ngOnInit() {
        this.chatService.getChats().subscribe(p => this.allChats = p.chats);
    }
}