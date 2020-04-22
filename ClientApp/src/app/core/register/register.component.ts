import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/Authentication.service';
import { AlertService } from '../services/Alert.service';
import { UsersService, ChatsService } from '../api/services';
import { NotificationType, NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UsersService,
        private alertService: AlertService,
        private notifications: NotificationsService,
        private chatsService: ChatsService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            nickname: ['', Validators.required],
            email: new FormControl('',[
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.apiUsersPost$Json({body: this.registerForm.value})
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data.Id);
                    this.chatsService.apiChatsAdminUserUserIdPost$Json({userId: data.Id}).subscribe();
                    this.notifications.create("Successfully Registered!", NotificationType.Success);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
