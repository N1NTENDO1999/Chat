import { Component, OnInit } from '@angular/core';
import { ChatsStore } from 'src/app/core/stores/chatsStore';
import { ScheduledMessagesStore } from 'src/app/core/stores/SchedluledMessagesStore';
import { Location } from '@angular/common';

@Component({
    selector: 'scheduled-messages-component',
    templateUrl: './scheduled-messages.component.html',
    styleUrls: ['./scheduled-messages.component.css']
})
export class ScheduledMessagesComponent implements OnInit {

    constructor(
        public chatsStore: ChatsStore,
        public scheduledStore: ScheduledMessagesStore,
        private location: Location,
    ) {
    }

    ngOnInit() {

    }

    goBack(): void {
        this.location.back();
    }
}