import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, ChatsService } from 'src/app/core/api/services';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { Location } from '@angular/common';
import { UserDto } from 'src/app/core/api/models';
import { ChatsStore } from 'src/app/core/stores/chatsStore';
import { AlertService } from 'src/app/core/services/Alert.service';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';

@Component({
    selector: 'users-search-component',
    templateUrl: './users-search.component.html',
    styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit {

    constructor(
        private router: Router,
        private userService: UsersService,
        private chatService: ChatsService,
        public usersStore: UsersStore,
        private chatsStore: ChatsStore,
        private location: Location,
        private alertService: AlertService,
        private signalRService: SignalrService
    ) {
    }

    search(term: string): void {
        if (!term.trim()) {
            this.usersStore.clearUsers();
            return;
        }
        this.userService.apiUsersNicknameGet$Json({ nickname: term })
            .subscribe(p => {
                this.usersStore.setUsers(p.Users);
            })

    }

    addUser(user: UserDto) {
        this.chatService
            .apiChatsChatChatIdUserUserIdGet$Json({ userId: user.Id, chatId: this.chatsStore.chat.Id })
            .subscribe(p => this.validateChat(user, p));
    }

    validateChat(user: UserDto, isConnected: boolean): void {
        if (isConnected) {
            this.alertService.error(`${user.Nickname} alredy connected to ${this.chatsStore.chat.Name}`);
            return;
        }
        else {
            this.signalRService.AddUserToChat(this.chatsStore.chat.Id, user.Id);
            this.alertService.success(`${user.Nickname} successfully connected to ${this.chatsStore.chat.Name}`)
        }
    }

    goBack(): void {
        this.location.back();
    }

    ngOnInit() {

    }
}