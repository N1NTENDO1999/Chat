import { Component, OnInit } from '@angular/core';
import { UsersStore } from 'src/app/core/stores/UsersStore';

@Component({
    selector: 'users-search-page-component',
    templateUrl: './users-search-page.component.html',
    styleUrls: ['./users-search-page.component.css']
})
export class UsersSearchPageComponent implements OnInit {

    constructor(
        private usersStore: UsersStore
    ) {
    }

    ngOnInit() {

    }

    activeProfile(): boolean {
        return this.usersStore.CanShowProfile;
    }
}