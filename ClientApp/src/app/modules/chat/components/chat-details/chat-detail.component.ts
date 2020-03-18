import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChatsService } from 'src/app/core/api/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChatDto } from 'src/app/core/api/models';
import { MessageDto } from 'src/app/core/models/MessageDto';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { User } from 'src/app/core/models/User';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'chat-detail-component',
    templateUrl: './chat-detail.component.html',
    styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit, OnChanges {
    @Input() chat: ChatDto;
    messageForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private chatService: ChatsService,
        private location: Location,
        public signalRService: SignalrService,
        private authService: AuthenticationService,
        private formBuilder: FormBuilder
    ) {
        
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.chat) {
            this.signalRService.GetChatMessages(this.chat.Id);
        }
        this.messageForm = new FormGroup({
            message: new FormControl('', [Validators.required])
         });
    }

    ngOnInit() {
        console.log("On Init Chat Detail");
        let user: User = this.authService.currentUserValue;
        this.signalRService.startConnection(user.Id);
        this.signalRService.addDataListeners();
    }

    onSubmit() {
        // stop here if form is invalid
        if (this.messageForm.invalid) {
            return;
        }
        let user: User = this.authService.currentUserValue;
        this.signalRService.AddChatMessages(this.chat.Id, user.Id, this.messageForm.controls.message.value);
        this.messageForm.controls.message.setValue(null);
           
    }

}