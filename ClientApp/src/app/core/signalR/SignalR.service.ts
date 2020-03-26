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

@Injectable()
export class SignalrService {

    private hubConnection: signalR.HubConnection

    constructor(
        private alertService: AlertService,
        private messagesStore: MessagesStore,
        private authService: AuthenticationService,
        private chatsStore: ChatsStore
    ) { }

    public GetPersonalMessages(id: number) {
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        this.hubConnection.invoke("GetPersonalMessages", id, currentUser.Id)
            .then(() => console.log('GetPersonalMEssages'))
            .catch(err => console.log('Error while starting connection: ' + err));
        return;
    }

    public GetChatMessages(id: number) {
        this.hubConnection.invoke("GetChatMessages", id)
            .then(() => console.log('GetChatMEssages'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public AddPersonalMessages(senderId: number, receiverId: number, message: string) {
        this.hubConnection.invoke("SendPersonalMessage", senderId, receiverId, message)
            .then(() => console.log('AddChatMEssages'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public AddChatMessages(chatId: number, userId: number, message: string) {
        this.hubConnection.invoke("SendMessageToChat", userId, chatId, message)
            .then(() => console.log('AddChatMEssages'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public AddUserToChat(chatId: number, userId: number): void {
        this.hubConnection.invoke("AddUserToChat", userId, chatId)
            .then(_ => console.log("Add User To Chat"))
            .catch(err => console.log("Error when Add User To Chat: " + err));
    }

    public GetScheduledMessages(senderId: number, receiverId: number, isPersonal: boolean){
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

    private updateMessages(id: number, messages: MessageDto[]) {
        console.log(messages);
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
        console.log(message);
        console.log(currentUser);
        console.log(receiverId);
        console.log(IsPersonal);
        if (((this.chatsStore.selectedChatId == receiverId || this.chatsStore.selectedChatId == message.SenderId) && this.chatsStore.chat.IsPersonal == IsPersonal)
            || (currentUser.Id == message.SenderId && IsPersonal)) {
            this.messagesStore.addMessage(message);
            return;
        }
        console.log(message);
    }

    private addScheduledMessage(message: ScheduledMessageDto): void {
        console.log(message);
    }

    public startConnection = (id: number) => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`https://localhost:44312/chatHub?UserId=${id}`)
            .build();

        this.hubConnection.onclose(() => setTimeout(() => { this.ConnectAgain(); }, 5000));

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => {
                console.log('Error while starting connection: ' + err);
                this.alertService.error("Cant Connect to server!");
                setTimeout(() => { this.ConnectAgain(); }, 5000)
            });
    }

    public disconnect() {
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
        this.hubConnection.on("GetScheduledMessages", (messages) => console.log(messages));
    }

}