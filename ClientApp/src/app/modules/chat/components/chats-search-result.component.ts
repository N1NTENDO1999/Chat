import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatsService, UsersService } from 'src/app/core/api/services';
import { ChatDto } from 'src/app/core/api/models';
import { first, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';

@Component({
    selector: 'chats-search-result-component',
    templateUrl: './chats-search-result.component.html',
    styleUrls: ['./chats-search-result.component.css']
})
export class ChatsSearchResultComponent implements OnInit {
    public allChats: ChatDto[] = [];

    @Output() chat = new EventEmitter<ChatDto>();

    constructor(
        private chatService: ChatsService,
        private userService: UsersService,
        private authService: AuthenticationService
    ) { }

    getChat(chat: ChatDto) {
        this.chatService
            .apiChatsChatChatIdUserUserIdGet$Json({ userId: this.authService.currentUserValue.Id, chatId: chat.Id })
            .subscribe(p => this.validateChat(chat, p));
    }

    validateChat(chat: ChatDto, isConnected: boolean): void {
        if (isConnected) {
            console.log("Hi");
            this.chat.emit(chat);
        }
        else{
            let result = window.confirm("Connect to chat?");
            console.log("Reverse Hi!");
        }

    }

    search(term: string): void {
        if (!term.trim()) {
            this.userService.apiUsersUserIdChatsGet$Json({ id: this.authService.currentUserValue.Id }).subscribe(p => {
                this.allChats = p.Chats;
            });
        }
        else {
            this.chatService.apiChatsChatNameGet$Json({ name: term }).subscribe(p => {
                this.allChats = p.Chats;
            });
        }
    }

    ngOnInit() {
        this.userService.apiUsersUserIdChatsGet$Json({ id: this.authService.currentUserValue.Id }).subscribe(p => {
            this.allChats = p.Chats;
            console.log(p.Chats);
        });
    }
}