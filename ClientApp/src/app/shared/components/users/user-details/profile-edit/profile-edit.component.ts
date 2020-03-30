import { Component, OnInit } from '@angular/core';
import { ProfileInfoDto } from 'src/app/core/api/models';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
        private router: Router
    ) {
        if(!this.usersStore.UserProfile){
            this.router.navigateByUrl('/profile');
        }
    }

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

    onSubmit(){
        console.log(this.user.Picture)
    }

    back(){
        
    }
}