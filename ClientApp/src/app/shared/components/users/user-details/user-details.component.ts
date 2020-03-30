import { Component, OnInit } from '@angular/core';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { UserDto } from 'src/app/core/api/models';
import { ProfileInfoDto } from 'src/app/core/api/models/profile-info-dto';
import { UsersService } from 'src/app/core/api/services';

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

    ngOnInit() {
        this.usersService.apiUsersUserIdProfileGet$Json({ id: this.usersStore.GetDetailUserId })
            .subscribe(p => this.user = p);
    }
}