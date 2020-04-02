import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { MessageDto } from '../models/MessageDto';
import { AlertService } from '../services/Alert.service';
import { MessagesStore } from '../stores/MessagesStore';
import { User } from '../models/User';
import { AuthenticationService } from '../services/Authentication.service';
import { ScheduledMessageDto } from '../models/ScheduledMessageDto';
import { ChatsStore } from '../stores/chatsStore';
import { ChatDto } from '../api/models';
import { ScheduledMessagesStore } from '../stores/SchedluledMessagesStore';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UsersService } from '../api/services';
import { first } from 'rxjs/operators';

@Injectable()
export class SignalrService {

    private hubConnection: signalR.HubConnection

    constructor(
        private alertService: AlertService,
        private messagesStore: MessagesStore,
        private authService: AuthenticationService,
        private chatsStore: ChatsStore,
        private scheduledMessagesStore: ScheduledMessagesStore,
        private notifications: NotificationsService,
        private usersService: UsersService
    ) { }

    public GetPersonalMessages(id: number) {
        console.log(this.messagesStore.First, this.messagesStore.Last);
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        this.hubConnection.invoke("GetPersonalMessages", id, currentUser.Id, this.messagesStore.First, this.messagesStore.Last)
            .then(() => console.log('GetPersonalMEssages'))
            .catch(err => console.log('Error while starting connection: ' + err));
        return;
    }

    public GetChatMessages(id: number) {
        console.log(this.messagesStore.First, this.messagesStore.Last);
        this.hubConnection.invoke("GetChatMessages", id, this.messagesStore.First, this.messagesStore.Last)
            .then(() => console.log('GetChatMEssages'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public AddPersonalMessages(senderId: number, receiverId: number, message: string) {
        this.hubConnection.invoke("SendPersonalMessage", senderId, receiverId, message)
            .then(() => { console.log('AddPersonalMEssages'); this.messagesStore.emitMessageAdded(); })
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public AddChatMessages(chatId: number, userId: number, message: string) {
        this.hubConnection.invoke("SendMessageToChat", userId, chatId, message)
            .then(() => { console.log('AddChatMEssages'); this.messagesStore.emitMessageAdded(); })
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public AddUserToChat(chatId: number, userId: number): void {
        this.hubConnection.invoke("AddUserToChat", userId, chatId)
            .then(_ => console.log("Add User To Chat"))
            .catch(err => console.log("Error when Add User To Chat: " + err));
    }

    public GetScheduledMessages(senderId: number, receiverId: number, isPersonal: boolean) {
        this.hubConnection.invoke("GetScheduledMessages", senderId, receiverId, isPersonal)
            .then(_ => console.log("Get Scheduled Messages"))
            .catch(err => console.log("Error when receive scheduled messages: " + err));
    }

    public SendScheduledMessage(senderId: number, receiverId: number, text: string, isPersonal: boolean, delivery: string) {
        let message = {
            ReceiverId: receiverId,
            SenderId: senderId,
            Text: text,
            Delivery: delivery,
            IsPersonal: isPersonal
        }
        this.hubConnection.invoke("AddScheduledMessage", message)
            .then(_ => console.log("Add Scheduled Message"))
            .catch(err => console.log("Error when Add User To Chat: " + err));
    }

    private updateScheduledMessages(messages: ScheduledMessageDto[]) {
        if (messages) {
            this.scheduledMessagesStore.setMessages(messages);
        }
    }

    private updateMessages(id: number, messages: MessageDto[]) {
        console.log("Here");
        this.messagesStore.setMessages(messages);
    }

    private updateChats(chat: ChatDto, userId: number) {
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        if (userId == currentUser.Id) {
            this.hubConnection.invoke("AddToGroup", chat.Id)
                .then(_ => console.log("User Added to group"))
                .catch(err => console.log("Error when Add User To Chat: " + err));
            this.chatsStore.addChat(chat);
        }
    }

    private addMessage(message: MessageDto, receiverId: number, IsPersonal: boolean) {
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        if (((this.chatsStore.selectedChatId == receiverId || this.chatsStore.selectedChatId == message.SenderId) && this.chatsStore.chat.IsPersonal == IsPersonal)
            || (currentUser.Id == message.SenderId && IsPersonal)) {
            this.messagesStore.addMessage(message);
            return;
        }
        this.notifications.create(message.Sender.Nickname, message.Text, NotificationType.Success);
    }

    private addScheduledMessage(message: ScheduledMessageDto): void {
        this.notifications.create("Successfully scheduled message", message.Text, NotificationType.Success);
    }

    private addUnreadMessage(chatId: number, isPersonal: boolean, messageId: number) {
        if (this.chatsStore.chat && this.chatsStore.chat.Id == chatId && this.chatsStore.chat.IsPersonal == isPersonal) {
            if (isPersonal) {
                this.hubConnection.invoke("ReadSinglePersonalMessage", messageId)
                    .then(() => console.log("Read Single Personal Chat Message"))
                    .catch(err => console.log('Cant Read Single Personal Message: ' + err));
                return;
            }
            this.hubConnection.invoke("ReadSingleChatMessage", messageId)
                .then(() => console.log("Read Single Chat Chat Message"))
                .catch(err => console.log('Cant Read Chat Personal Message: ' + err));
            return;
        }
        this.chatsStore.IncreaceUnreadCount(chatId, isPersonal);
    }

    public startConnection = (id: number) => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`https://localhost:44312/chatHub?UserId=${id}`)
            .build();

        this.hubConnection.onclose(() => setTimeout(() => { this.ConnectAgain(); }, 5000));

        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started');
                this.updateUserStatus();
                setTimeout(() => { this.updateUserStatus(); }, 120000);
            })
            .catch(err => {
                console.log('Error while starting connection: ' + err);
                this.alertService.error("Cant Connect to server!");
                setTimeout(() => { this.ConnectAgain(); }, 5000);
            });
    }

    updateUserStatus() {
        if (this.authService.currentUserValue) {
            this.usersService.apiUsersUserIdStatusPut$Json({ id: this.authService.currentUserValue.Id })
                .pipe(first())
                .subscribe(() => console.log("Status Updated"));
            setTimeout(() => { this.updateUserStatus(); }, 120000);
        }
    }

    public MarkMessagesAsRead(chat: ChatDto, userId: number) {
        if (chat.IsPersonal) {
            this.hubConnection.invoke("MarkAsReadPersonal", chat.Id, userId)
                .then(() => this.chatsStore.MarkAsRead(chat.Id, chat.IsPersonal))
                .catch(err => {
                    console.log('Error while read personal messages ' + err);
                });
        }
        else {
            this.hubConnection.invoke("MarkAsReadChat", chat.Id, userId)
                .then(() => this.chatsStore.MarkAsRead(chat.Id, chat.IsPersonal))
                .catch(err => {
                    console.log('Error while read chat messages ' + err);
                });
        }
    }

    public disconnect() {
        this.usersService.apiUsersUserIdStatusPut$Json({ id: this.authService.currentUserValue.Id })
            .pipe(first())
            .subscribe(() => console.log("Status Updated"));
        this.hubConnection.stop()
        console.log("Stoped connection");
    }

    public isConnected(): boolean {
        if (this.hubConnection === undefined) {
            return false;
        }
        else if (this.hubConnection.state) {
            return true;
        }
        else {
            return false;
        }
    }

    public ConnectAgain() {
        if (this.hubConnection.state) {
            return;
        }
        if (this.authService.currentUserValue) {
            this.alertService.error("Lost Connetction with server!", true);
            this.hubConnection.start().then(() => {
                console.log('Connection started');
                this.alertService.success("Connected!");
            });
        }
        console.log(this.hubConnection.state);
        if (!this.hubConnection.state) {
            setTimeout(() => { this.ConnectAgain(); }, 5000);
        }
    }
    public addDataListeners(): void {
        this.hubConnection.on("GetChatMessages", (id, message) => this.updateMessages(id, message));
        this.hubConnection.on("UpdateChatMessages", (message, receiverId, IsPersonal) => this.addMessage(message, receiverId, IsPersonal));
        this.hubConnection.on("GetPersonalMessages", (id, message) => this.updateMessages(id, message));
        this.hubConnection.on("AddScheduledMessage", (message) => this.addScheduledMessage(message));
        this.hubConnection.on("AddUserToChat", (chat, userId) => this.updateChats(chat, userId));
        this.hubConnection.on("Msq", (chat) => console.log(chat));
        this.hubConnection.on("GetScheduledMessages", (messages) => this.updateScheduledMessages(messages));
        this.hubConnection.on("AddUnreadMessage", (chatId, isPersonal, messageId) => this.addUnreadMessage(chatId, isPersonal, messageId));
    }

}