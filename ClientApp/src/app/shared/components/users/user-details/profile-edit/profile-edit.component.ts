import { Component, OnInit } from '@angular/core';
import { ProfileInfoDto } from 'src/app/core/api/models';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/core/api/services';
import { AlertService } from 'src/app/core/services/Alert.service';

@Component({
    selector: 'profile-edit-component',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
    user: ProfileInfoDto;
    editForm: FormGroup;
    URL;

    constructor(
        private usersStore: UsersStore,
        private formBuilder: FormBuilder,
        private router: Router,
        private usersService: UsersService,
        private location: Location,
        private alertService: AlertService
    ) {
        if (!this.usersStore.UserProfile) {
            this.router.navigateByUrl('/profile');
        }
    }

    get f() { return this.editForm.controls; }

    ngOnInit() {
        this.user = this.usersStore.UserProfile;
        this.editForm = this.formBuilder.group({
            firstName: [this.user.FirstName, Validators.required],
            lastName: [this.user.LastName, Validators.required],
            nickname: [this.user.Nickname, Validators.required],
        });
    }

    useImage(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // Read file as data url
            reader.onloadend = (e) => { // function call once readAsDataUrl is completed
                this.URL = reader.result; // Set image in element
                this.user.Picture = this.URL;
                // this._changeDetection.markForCheck(); // Is called because ChangeDetection is set to onPush
            };
        }
    }



    onSubmit() {
        if (!this.editForm.valid) {
            return;
        }

        let result = window.confirm("Apply Changer?");
        if (!result) {
            this.alertService.error("changes canceled");
            return;
        }

        this.user.FirstName = this.f.firstName.value;
        this.user.LastName = this.f.lastName.value;
        this.user.Nickname = this.f.nickname.value;

        this.usersService
            .apiUsersUserIdProfilePut$Json({ id: "1", body: { profile: this.user } })
            .subscribe(
                p => {
                    this.alertService.success("Profile is updated!", true);
                    this.router.navigateByUrl('/profile');
                }
            );
    }

    back() {
        this.usersStore.ClearEditProfile();
        this.location.back();
    }
}