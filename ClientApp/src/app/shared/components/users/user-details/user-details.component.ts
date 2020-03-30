import { Component, OnInit } from '@angular/core';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { UserDto } from 'src/app/core/api/models';
import { ProfileInfoDto } from 'src/app/core/api/models/profile-info-dto';
import { UsersService } from 'src/app/core/api/services';
import { User } from 'src/app/core/models/User';

@Component({
    selector: 'user-details-component',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    user: ProfileInfoDto;

    constructor(
        private usersStore: UsersStore,
        private usersService: UsersService
    ) {
    }

    canEdit(): boolean {
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser.Id === this.user.Id; 
    }

    ngOnInit() {
        this.usersService.apiUsersUserIdProfileGet$Json({ id: this.usersStore.GetDetailUserId })
            .subscribe(p => this.user = p);
    }
}