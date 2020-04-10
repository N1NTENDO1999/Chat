import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatsService, UsersService } from 'src/app/core/api/services';
import { ChatDto } from 'src/app/core/api/models';
import { first, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { AlertService } from 'src/app/core/services/Alert.service';
import { ChatsStore } from 'src/app/core/stores/chatsStore';
import { MessagesStore } from 'src/app/core/stores/MessagesStore';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User';

@Component({
    selector: 'chats-search-result-component',
    templateUrl: './chats-search-result.component.html',
    styleUrls: ['./chats-search-result.component.css']
})
export class ChatsSearchResultComponent implements OnInit {
    public allChats: ChatDto[] = [];
    currentUser: User;
    
    constructor(
        private chatService: ChatsService,
        private userService: UsersService,
        private authService: AuthenticationService,
        public signalRService: SignalrService,
        private alertService: AlertService,
        public chatsStore: ChatsStore,
        public messagesStore: MessagesStore,
        private router: Router,
        private authenticationService: AuthenticationService,
        private usersStore: UsersStore
    ) { }

    getChat(chat: ChatDto) {
        this.messagesStore.startLoading();
        this.messagesStore.clearMessages();
        if (chat.IsPersonal) {
            this.chatsStore.addSelectedChat(chat);
            this.signalRService.GetPersonalMessages(chat.Id);
            if (chat.UnreadMessagesCount) {
                this.signalRService.MarkMessagesAsRead(chat, this.authService.currentUserValue.Id);
            }
            return;
        }
        this.chatService
            .apiChatsChatChatIdUserUserIdGet$Json({ userId: this.authService.currentUserValue.Id, chatId: chat.Id })
            .subscribe(p => this.validateChat(chat, p));
    }

    validateChat(chat: ChatDto, isConnected: boolean): void {
        if (isConnected) {
            this.chatsStore.addSelectedChat(chat);
            if (chat.UnreadMessagesCount) {
                this.signalRService.MarkMessagesAsRead(chat, this.authService.currentUserValue.Id);
            }
        }

        else {
            let result = window.confirm("Connect to chat?");
            if (!result) {
                this.alertService.error("Cant connect to chat: " + chat.Name);
                this.messagesStore.stopLoading();
                return;
            }
            this.signalRService.AddUserToChat(chat.Id, this.authService.currentUserValue.Id);
            this.chatsStore.addSelectedChat(chat);
        }
        this.signalRService.GetChatMessages(chat.Id);
    }

    search(term: string): void {
        if (!term.trim()) {
            this.userService.apiUsersUserIdChatsGet$Json({ id: this.authService.currentUserValue.Id }).subscribe(p => {
                this.chatsStore.setChats(p.Chats);
            });
        }
        else {
            this.chatService.apiChatsChatSearchNameGet$Json({ name: term }).subscribe(p => {
                this.chatsStore.setChats(p.Chats);
                console.log(p.Chats);
            });
        }
    }
    hello(){
        console.log("Hello");
    }
    ngOnInit() {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x); 
        console.log(this.currentUser);
        this.userService.apiUsersUserIdChatsGet$Json({ id: this.authService.currentUserValue.Id }).subscribe(p => {
            this.chatsStore.setChats(p.Chats);
        });
    }

    logout() {
        this.messagesStore.clearMessages();
        this.chatsStore.clearchats();
        this.chatsStore.clearSelected();
        this.signalRService.disconnect();
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    details(){
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        this.usersStore.setDetailUserId(currentUser.Id);
        this.router.navigateByUrl('/profile');
    }

    searchUsers(){
        this.chatsStore.clearSelected();
        this.router.navigateByUrl('/search/user');
    }

    searchMessages(){
        this.chatsStore.clearSelected();
        this.router.navigateByUrl('search/messages');
    }

}