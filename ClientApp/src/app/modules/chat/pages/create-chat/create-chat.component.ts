import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { AlertService } from 'src/app/core/services/Alert.service';
import { first } from 'rxjs/operators';
import { ChatsService } from 'src/app/core/api/services';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { ChatDto } from 'src/app/core/api/models';
import { ChatsStore } from 'src/app/core/stores/chatsStore';

@Component({
    selector: 'create-chat-component',
    templateUrl: './create-chat.component.html',
    styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit {

    createForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService,
        private chatService: ChatsService,
        private alertService: AlertService,
        private signalRService: SignalrService,
        private chatsStore: ChatsStore
    ) { }

    get f() { return this.createForm.controls; }

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            name: ['', Validators.required],
            isPrivate: new FormControl(false)
        });

        // get return url from route parameters or default to '/'
       // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.createForm.invalid) {
            return;
        }

        this.loading = true;
        this.chatService
            .apiChatsPost$Json({
                 body: { Name: this.f.name.value, IsPrivate: this.f.isPrivate.value, UserId: this.authService.currentUserValue.Id }
                 })
            .pipe(first())
            .subscribe(
                data => {
                    this.signalRService.AddUserToChat(data.Chat.Id, this.authService.currentUserValue.Id);
                    this.chatsStore.addSelectedChat(data.Chat);
                    this.router.navigate(["/"]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}