import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChatsService } from 'src/app/core/api/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChatDto } from 'src/app/core/api/models';

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
        private location: Location
    ) {
    }
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        throw new Error("Method not implemented.");
    }

    ngOnInit() {
    }
}