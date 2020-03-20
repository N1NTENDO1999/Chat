import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ChatsService } from 'src/app/core/api/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChatDto } from 'src/app/core/api/models';
import { MessageDto } from 'src/app/core/models/MessageDto';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { User } from 'src/app/core/models/User';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ChatsStore } from 'src/app/core/stores/chatsStore';
import { toJS } from 'mobx';


@Component({
    selector: 'chat-detail-component',
    templateUrl: './chat-detail.component.html',
    styleUrls: ['./chat-detail.component.css']
})

export class ChatDetailComponent implements OnInit, OnDestroy {
   // @Input() chat: ChatDto;
    messageForm: FormGroup;
    
    constructor(
        private route: ActivatedRoute,
        private chatService: ChatsService,
        private location: Location,
        public signalRService: SignalrService,
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        public chatsStore: ChatsStore
    ) {

    }
    ngOnDestroy(): void {
        console.log("Destroy");
        //this.chat = null;
        this.signalRService.chatMessages = [];
    }
    

    ngOnInit() {
        this.messageForm = new FormGroup({
            message: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        // stop here if form is invalid
        if (this.messageForm.invalid) {
            return;
        }
        let user: User = this.authService.currentUserValue;
        this.signalRService.AddChatMessages(this.chatsStore.selectedChatId, user.Id, this.messageForm.controls.message.value);
        this.messageForm.controls.message.setValue(null);

    }

}