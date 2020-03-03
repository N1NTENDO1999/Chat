import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/core/models/Chat';
import { ChatService } from 'src/app/core/http/Chat.service';
import { AllChatsDTO } from 'src/app/core/http/DTOs/AllChatsDTO';
import { ChatsService } from 'src/app/core/api/services';
import { ChatDto } from 'src/app/core/api/models';

@Component({
    selector: 'chats-search-result-component',
    templateUrl: './chats-search-result.component.html',
    styleUrls: ['./chats-search-result.component.css']
})
export class ChatsSearchResultComponent implements OnInit {

    public allChats: Array<ChatDto>;

    constructor(
        private chatService: ChatsService
    ) { }

    getAllChats(): void {
        
    }

    ngOnInit() {
        this.chatService.apiChatsGet$Json().subscribe(p =>{ this.allChats = p.Chats; console.log(p)});
        console.log(this.allChats);
    }
}