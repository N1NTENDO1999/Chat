import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChatsService } from 'src/app/core/api/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChatDto } from 'src/app/core/api/models';
import { MessageDto } from 'src/app/core/models/MessageDto';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';

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
        private signalRService: SignalrService
    ) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        
    }

    ngOnInit() {
        this.signalRService.startConnection();
    }
}