import { Component, OnInit } from '@angular/core';
import { ProfileInfoDto } from 'src/app/core/api/models';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'profile-edit-component',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
    user: ProfileInfoDto;
    editForm: FormGroup;

    constructor(
        private usersStore: UsersStore,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.user = this.usersStore.UserProfile;
        this.editForm = this.formBuilder.group({
            firstName: [this.user.FirstName, Validators.required],
            lastName: [this.user.LastName, Validators.required],
            nickname: [this.user.Nickname, Validators.required],
        });
    }
}