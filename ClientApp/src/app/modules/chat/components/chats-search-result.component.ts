import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatsService } from 'src/app/core/api/services';
import { ChatDto } from 'src/app/core/api/models';
import { first } from 'rxjs/operators';

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
        this.chatService.apiChatsGet$Json().subscribe(p => {
             this.allChats = p.Chats as ChatDto[]; console.log(p) 
            });
        console.log(this.allChats);
    }
}