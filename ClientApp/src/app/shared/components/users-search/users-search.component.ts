import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, ChatsService } from 'src/app/core/api/services';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { Location } from '@angular/common';
import { UserDto } from 'src/app/core/api/models';
import { ChatsStore } from 'src/app/core/stores/chatsStore';
import { AlertService } from 'src/app/core/services/Alert.service';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
    selector: 'users-search-component',
    templateUrl: './users-search.component.html',
    styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit, OnDestroy {

    constructor(
        private router: Router,
        private userService: UsersService,
        private chatService: ChatsService,
        public usersStore: UsersStore,
        private chatsStore: ChatsStore,
        private location: Location,
        private alertService: AlertService,
        private signalRService: SignalrService,
        private notifications: NotificationsService,
    ) {
    }
    ngOnDestroy(): void {
        this.usersStore.clearUsers();
    }

    search(term: string): void {
        if (!term.trim()) {
            this.usersStore.clearUsers();
            return;
        }
        this.userService.apiUsersNicknameGet$Json({ nickname: term })
            .subscribe(p => {
                this.usersStore.setUsers(p.Users);
            });

    }

    details(user: UserDto) {
        if (user.Id != this.usersStore.GetDetailUserId) {
            this.usersStore.setDetailUserId(user.Id);
            this.usersStore.HideProfile();
            setTimeout(() => this.usersStore.ShowProfile(), 300);
        }
    }

    addUser(user: UserDto) {
        this.chatService
            .apiChatsChatChatIdUserUserIdGet$Json({ userId: user.Id, chatId: this.chatsStore.chat.Id })
            .subscribe(p => this.validateChat(user, p));
    }

    validateChat(user: UserDto, isConnected: boolean): void {
        if (isConnected) {
            this.notifications.create(user.Nickname, "Cant Add To Chat!", NotificationType.Warn);
            return;
        }
        else {
            this.signalRService.AddUserToChat(this.chatsStore.chat.Id, user.Id);
            this.notifications.create(user.Nickname, "Successfully Added To Chat!", NotificationType.Info);
        }
    }

    goBack(): void {
        this.location.back();
    }

    isChat(): boolean {
        if(this.chatsStore.chat == undefined)
        {
            return false;
        }
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.chatsStore.chat.OwnerId == currentUser.Id || !this.chatsStore.chat.IsPrivate;
    }

    ngOnInit() {
        this.userService.apiUsersGet$Json()
            .subscribe(p => {
                this.usersStore.setUsers(p.Users);
            });
    }
}