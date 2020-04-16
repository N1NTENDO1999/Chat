import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ChatsService } from 'src/app/core/api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChatDto, UserDto } from 'src/app/core/api/models';
import { MessageDto } from 'src/app/core/models/MessageDto';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { User } from 'src/app/core/models/User';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ChatsStore } from 'src/app/core/stores/chatsStore';
import { MessagesStore } from 'src/app/core/stores/MessagesStore';
import { Subscription } from 'rxjs';
import { UsersStore } from 'src/app/core/stores/UsersStore';
import { ScheduledMessagesStore } from 'src/app/core/stores/SchedluledMessagesStore';


@Component({
    selector: 'chat-detail-component',
    templateUrl: './chat-detail.component.html',
    styleUrls: ['./chat-detail.component.css']
})

export class ChatDetailComponent implements OnInit {
    messageForm: FormGroup;
    minDate: string;
    deliveryDate: string;
    subscription: Subscription;
    userId: number;
    isScheduled = false;
    display='none';
    countOfUsers = 0;

    constructor(
        public signalRService: SignalrService,
        private authService: AuthenticationService,
        public chatsStore: ChatsStore,
        public messagesStore: MessagesStore,
        private authenticationService: AuthenticationService,
        private router: Router,
        private usersStore: UsersStore,
        public scheduledStore: ScheduledMessagesStore,
        private chatsService: ChatsService
    ) {
        this.subscription = this.messagesStore.messagesUpdated().subscribe(() => this.scrollDown());
        this.chatsStore.selectedChatAdded().subscribe(id => this.getUserCount(id));
    }

    private getUserCount(id: number){
        this.chatsService.apiChatsChatIdUserCountGet$Json({id: id}).subscribe(p => this.countOfUsers = p.Count);
    }

    private scrollDown = () => {
        var element = document.getElementById("scrollerDiv");
        element.scrollTop = element.scrollHeight;
    }


    private toDateString(date: Date): string {
        return (date.getFullYear().toString() + '-'
            + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
            + ("0" + (date.getDate())).slice(-2))
            + 'T' + date.toTimeString().slice(0, 5);
    }

    ngOnInit() {
        this.messageForm = new FormGroup({
            message: new FormControl('', [Validators.required])
        });

        this.minDate = this.toDateString(new Date());
        this.deliveryDate = this.minDate;
        this.userId = JSON.parse(localStorage.getItem('currentUser')).Id;

        console.log(this.userId);

    }

    isOwner(): boolean {
        const currentUser = this.authenticationService.currentUserValue;
        return this.chatsStore.chat.OwnerId == currentUser.Id || !this.chatsStore.chat.IsPrivate;
    }

    isCurentUser(userId: number) {
        return userId === this.userId;
    }

    sendAsSchedule() {
        console.log(this.deliveryDate);
        if (this.messageForm.invalid || this.deliveryDate === undefined) {
            return;
        }
        let user: User = this.authService.currentUserValue;
        this.signalRService
            .SendScheduledMessage(user.Id, this.chatsStore.selectedChatId,
                this.messageForm.controls.message.value, this.chatsStore.chat.IsPersonal, this.deliveryDate);
        this.messageForm.controls.message.setValue(null);

    }

    details(user: UserDto) {
        if (user.Id != this.usersStore.GetDetailUserId) {
            this.usersStore.setDetailUserId(user.Id);
            this.usersStore.HideProfile();
            setTimeout(() => this.usersStore.ShowProfile(), 300);
        }
    }

    addUserRoute() {
        this.router.navigateByUrl('search/user');
    }

    public onDateChange(value: string): void {
        this.deliveryDate = value;
    }

    public scheduledMessages() {
        if (this.chatsStore.chat) {
            let user: User = this.authService.currentUserValue;
            this.signalRService.GetScheduledMessages(user.Id, this.chatsStore.selectedChatId, this.chatsStore.chat.IsPersonal);
            this.isScheduled = true;
        }
    }

    public allMessages() {
        this.isScheduled = false;
    }

    MoreMessages() {
        this.messagesStore.startLoading();
        console.log(this.chatsStore.chat);
        if (this.chatsStore.chat.IsPersonal) {
            this.signalRService.GetPersonalMessages(this.chatsStore.chat.Id);
            return;
        }
        this.signalRService.GetChatMessages(this.chatsStore.chat.Id);
    }

    onSubmit() {
        // stop here if form is invalid
        if (this.messageForm.invalid) {
            return;
        }
        let user: User = this.authService.currentUserValue;

        if (this.chatsStore.selectedChat.IsPersonal) {
            this.signalRService
                .AddPersonalMessages(user.Id, this.chatsStore.selectedChatId, this.messageForm.controls.message.value);
        }
        else {
            this.signalRService.AddChatMessages(this.chatsStore.selectedChatId, user.Id, this.messageForm.controls.message.value);
        }
        this.messageForm.controls.message.setValue(null);

    }

    schedule(){
        if (this.messageForm.invalid){
            this.scheduledMessages();
            return;
        }
        this.openModalDialog();
    }

    openModalDialog() {
        this.display = 'block'; //Set block css
    }

    closeModalDialog() {
        this.display = 'none'; //set none css after close dialog
    }

}