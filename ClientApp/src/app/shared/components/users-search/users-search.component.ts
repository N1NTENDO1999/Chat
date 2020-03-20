import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, ChatsService } from 'src/app/core/api/services';
import { UsersStore } from 'src/app/core/stores/UsersStore';

@Component({
    selector: 'users-search-component',
    templateUrl: './users-search.component.html',
    styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit {

    constructor(
        private router: Router,
        private userService: UsersService,
        private chatService: ChatsService,
        public usersStore: UsersStore
    ) {
    }

    search(term: string): void {
        if (!term.trim()) {
            this.usersStore.clearUsers();
            return;
        }
        this.userService.apiUsersNicknameGet$Json({ nickname: term })
        .subscribe(p => {
            this.usersStore.setUsers(p.Users);
        })

    }

    ngOnInit() {

    }
}