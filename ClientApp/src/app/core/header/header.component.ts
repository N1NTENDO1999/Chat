import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthenticationService } from '../services/Authentication.service';
import { Router } from '@angular/router';
import { ChatsStore } from '../stores/chatsStore';
import { MessagesStore } from '../stores/MessagesStore';

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private chatsStore: ChatsStore,
        private messagesStore: MessagesStore
    ) {}

    logout() {
        this.authenticationService.logout();
        this.messagesStore.clearMessages();
        this.chatsStore.clearchats();
        this.chatsStore.clearSelected();
        this.router.navigate(['/login']);
    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x); 
        console.log(this.currentUser);
    }
}