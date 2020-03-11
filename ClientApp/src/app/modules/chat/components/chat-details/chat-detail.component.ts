import { Component, OnInit } from '@angular/core';
import { ChatsService } from 'src/app/core/api/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChatDto } from 'src/app/core/api/models';

@Component({
    selector: 'chat-detail-component',
    templateUrl: './chat-detail.component.html',
    styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {
    chat: ChatDto;

    constructor(
        private route: ActivatedRoute,
        private chatService: ChatsService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.getChat();
    }

    getChat(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.chatService.apiChatsIdGet$Json({ id })
            .subscribe(chat => {
                this.chat = chat.Chat;
                console.log(chat.Chat)
            });
    }
}