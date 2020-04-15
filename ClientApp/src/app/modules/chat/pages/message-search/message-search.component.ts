import { Component, OnInit } from '@angular/core';
import { UsersStore } from 'src/app/core/stores/UsersStore';

@Component({
    selector: 'message-search-component',
    templateUrl: './message-search.component.html',
    styleUrls: ['./message-search.component.css']
})
export class MessageSearchComponent implements OnInit {

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