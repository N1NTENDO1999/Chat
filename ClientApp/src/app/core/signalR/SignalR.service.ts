import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { MessageDto } from '../models/MessageDto';

@Injectable()
export class SignalrService {

    private hubConnection: signalR.HubConnection
    chatMessages: MessageDto[] = [];

    constructor(

    ) { }

    public GetChatMessages(id: number) {
        this.hubConnection.invoke("GetChatMessages", id)
            .then(() => console.log('GetChatMEssages'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public AddChatMessages(chatId: number, userId: number, message: string) {
        this.hubConnection.invoke("SendMessageToChat", userId, chatId, message)
            .then(() => console.log('AddChatMEssages'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    private updateMessages(id: number, messages: MessageDto[]) {
        console.log(messages);
        console.log(id);
    }

    private addMessage(message: MessageDto) {
        console.log(message);
    }

    public startConnection = (id: number) => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`https://localhost:44312/chatHub?UserId=${id}`)
            .build();
       
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public addDataListeners(): void {
        this.hubConnection.on("GetChatMessages", (id, message) => this.updateMessages(id, message));
        this.hubConnection.on("UpdateChatMessages", (chatId, userID, message) => this.addMessage(message));
    }
}