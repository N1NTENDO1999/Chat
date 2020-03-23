import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { MessageDto } from '../models/MessageDto';
import { AlertService } from '../services/Alert.service';
import { MessagesStore } from '../stores/MessagesStore';
import { User } from '../models/User';

@Injectable()
export class SignalrService {

    private hubConnection: signalR.HubConnection

    constructor(
        private alertService: AlertService,
        private messagesStore: MessagesStore
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
    private updateMessages(id: number, messages: MessageDto[]) {
        console.log(messages);
        this.messagesStore.setMessages(messages);
    }

    private addMessage(message: MessageDto) {
        this.messagesStore.addMessage(message);
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
        this.alertService.error("Lost Connetction with server!", true);
        //       this.hubConnection.stop();
        this.hubConnection.start().then(() => {
            console.log('Connection started');
            this.alertService.success("Connected!");
        });
        console.log(this.hubConnection.state);
        if (!this.hubConnection.state) {
            setTimeout(() => { this.ConnectAgain(); }, 5000);
        }
    }
    public addDataListeners(): void {
        this.hubConnection.on("GetChatMessages", (id, message) => this.updateMessages(id, message));
        this.hubConnection.on("UpdateChatMessages", (message) => this.addMessage(message));
        this.hubConnection.on("GetPersonalMessages", (id, message) => this.updateMessages(id, message));
    }
}