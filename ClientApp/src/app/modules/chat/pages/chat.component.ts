import { Component, OnInit } from '@angular/core';
import { ChatDto } from 'src/app/core/api/models';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from 'src/app/core/api/services';
import { Location } from '@angular/common';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { User } from 'src/app/core/models/User';
import { UsersStore } from 'src/app/core/stores/UsersStore';

@Component({
    selector: 'chat-component',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    chat: ChatDto;

    constructor(
        private route: ActivatedRoute,
        private chatService: ChatsService,
        private location: Location,
        private signalRService: SignalrService,
        private authService: AuthenticationService,
        private usersStore: UsersStore
    ) {
    }

    ngOnInit() {
        if (!this.signalRService.isConnected()) {
            let user: User = this.authService.currentUserValue;
            this.signalRService.startConnection(user.Id);
            this.signalRService.addDataListeners();
        }
    }

    getChat(chat: ChatDto): void {
        this.chat = chat;
    }

    activeProfile(): boolean {
        return this.usersStore.CanShowProfile;
    }
}

