import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';

@Component({
    selector: 'messages-search-component',
    templateUrl: './messages-search.component.html',
    styleUrls: ['./messages-search.component.css']
})
export class MessagesSearchComponent implements OnInit {

    constructor(
        private signalRService: SignalrService,

    ) {
    }

    ngOnInit() {

    }

    search(term: string): void {
        if (term.trim()) {
           console.log(term);
        }
    }

}