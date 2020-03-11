import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable()
export class SignalrService {

    private hubConnection: signalR.HubConnection

    constructor(
    ) { }


    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
                                .withUrl('https://localhost:44312/chatHub')
                                .build();
     
        this.hubConnection
          .start()
          .then(() => console.log('Connection started'))
          .catch(err => console.log('Error while starting connection: ' + err))
      }
}