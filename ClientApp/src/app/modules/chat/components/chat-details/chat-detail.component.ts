import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChatsService } from 'src/app/core/api/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChatDto } from 'src/app/core/api/models';
import { MessageDto } from 'src/app/core/models/MessageDto';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { User } from 'src/app/core/models/User';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';

@Component({
    selector: 'chat-detail-component',
    templateUrl: './chat-detail.component.html',
    styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit, OnChanges {
    @Input() chat: ChatDto;

    constructor(
        private route: ActivatedRoute,
        private chatService: ChatsService,
        private location: Location,
        private signalRService: SignalrService,
        private authService: AuthenticationService
    ) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.chat) {
            let user: User = this.authService.currentUserValue;
            this.signalRService.GetChatMessages(this.chat.Id);
        }
    }

    ngOnInit() {
        let user: User = this.authService.currentUserValue;
        this.signalRService.startConnection(user.Id);
        this.signalRService.addDataListeners();
    }
}