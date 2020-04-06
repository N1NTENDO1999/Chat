import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthenticationService } from '../services/Authentication.service';
import { Router } from '@angular/router';
import { ChatsStore } from '../stores/chatsStore';
import { MessagesStore } from '../stores/MessagesStore';
import { SignalrService } from '../signalR/SignalR.service';
import { UsersStore } from '../stores/UsersStore';

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
        private messagesStore: MessagesStore,
        private signalRService: SignalrService,
        private usersStore: UsersStore
    ) {}

    logout() {
        this.messagesStore.clearMessages();
        this.chatsStore.clearchats();
        this.chatsStore.clearSelected();
        this.signalRService.disconnect();
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    details(){
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        this.usersStore.setDetailUserId(currentUser.Id);
        this.router.navigateByUrl('/profile');
    }

    searchUsers(){
        this.chatsStore.clearSelected();
        this.router.navigateByUrl('/search/user');
    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x); 
        console.log(this.currentUser);
    }
}