import { Component, OnInit } from '@angular/core';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { UserDto } from 'src/app/core/api/models';

@Component({
    selector: 'user-details-component',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    userId: number;

    constructor(
        private usersStore: UsersStore
    ) {
    }

    ngOnInit() {
        this.userId = this.usersStore.GetDetailUserId;
        console.log(this.user);
    }
}