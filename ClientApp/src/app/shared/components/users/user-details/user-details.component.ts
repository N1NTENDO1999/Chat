import { Component, OnInit } from '@angular/core';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { UserDto } from 'src/app/core/api/models';
import { ProfileInfoDto } from 'src/app/core/api/models/profile-info-dto';
import { UsersService } from 'src/app/core/api/services';
import { User } from 'src/app/core/models/User';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'user-details-component',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    user: ProfileInfoDto;
    URL;
    constructor(
        private router: Router,
        private usersStore: UsersStore,
        private usersService: UsersService,
        private location: Location
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

    isActive(): boolean{
         return new Date().getTime() - new Date(this.user.ActiveDateTime).getTime() < 125116;
    }

    edit(){
        this.usersStore.SetEditProfile(this.user);
        this.router.navigateByUrl("/profile/edit");
    }

    goBack(): void {
        this.location.back();
    }
}