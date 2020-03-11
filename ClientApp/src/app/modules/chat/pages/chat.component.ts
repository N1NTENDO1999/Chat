import { Component, OnInit } from '@angular/core';
import { ChatDto } from 'src/app/core/api/models';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from 'src/app/core/api/services';
import { Location } from '@angular/common';

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
        private location: Location
    ) {
    }

    ngOnInit() {
        console.log(JSON.parse(localStorage.getItem('currentUser')));
    }

    getChat(chat: ChatDto): void {
        this.chat = chat;
    }
}

