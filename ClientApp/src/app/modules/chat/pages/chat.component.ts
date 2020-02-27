import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chat-component',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.log(JSON.parse(localStorage.getItem('currentUser')));
    }
}