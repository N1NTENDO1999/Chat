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
    URL;
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
        let id: number;
        if (this.usersStore.GetDetailUserId) {
            id = this.usersStore.GetDetailUserId;
        }
        else {
            id = JSON.parse(localStorage.getItem('currentUser')).Id;
        }

        this.usersService.apiUsersUserIdProfileGet$Json({ id: id })
            .subscribe(p => this.user = p);
    }
    useImage(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // Read file as data url
            reader.onloadend = (e) => { // function call once readAsDataUrl is completed
                this.URL = reader.result; // Set image in element
                console.log(this.URL);
                this.user.Picture = this.URL;
                // this._changeDetection.markForCheck(); // Is called because ChangeDetection is set to onPush
            };
        }
    }
}