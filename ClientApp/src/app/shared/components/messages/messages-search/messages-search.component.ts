import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MessagesSearchStore } from 'src/app/core/stores/MessagesSearchStore';
import { UsersService, ChatsService } from 'src/app/core/api/services';
import { User } from 'src/app/core/models/User';
import { ChatsStore } from 'src/app/core/stores/chatsStore';
import { ChatMessageDto, SearchedPersonalMessageDto } from 'src/app/core/api/models';
import { MessagesStore } from 'src/app/core/stores/MessagesStore';

@Component({
    selector: 'messages-search-component',
    templateUrl: './messages-search.component.html',
    styleUrls: ['./messages-search.component.css']
})
export class MessagesSearchComponent implements OnInit, OnDestroy {

    private _searchSubject: Subject<string> = new Subject();

    constructor(
        private signalRService: SignalrService,
        public searchStore: MessagesSearchStore,
        private userSerice: UsersService,
        private chatsStore: ChatsStore,
        private chatsService: ChatsService,
        private messagesStore: MessagesStore
    ) {
        this._setSearchSubscription();
    }
    ngOnDestroy(): void {
        this._searchSubject.unsubscribe();
    }

    private _setSearchSubscription() {
        this._searchSubject.pipe(
            debounceTime(500)
        ).subscribe((term: string) => {
            if (term.trim()) {
                console.log(term);
                this.searchChatMessages(term);
                this.searchPersonalMessages(term);
            }
        });
    }

    private searchChatMessages(term: string) {
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        let id = currentUser.Id;
        this.userSerice.apiUsersUserIdMessagesChatTermGet$Json({ id, term })
            .subscribe(p => {
                console.log(p.Messages);
                this.searchStore.SetChatMessages(p.Messages);
            });
    }

    private searchPersonalMessages(term: string) {
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        let id = currentUser.Id;
        this.userSerice.apiUsersUserIdMessagePrivateTermGet$Json({ id, term })
            .subscribe(p => {
                console.log(p.Messages);
                this.searchStore.SetPersonalMessages(p.Messages);
            });
    }

    public updateSearch(searchTextValue: string) {
        this._searchSubject.next(searchTextValue);
    }

    getPersonalChat(message: SearchedPersonalMessageDto) {
        this.messagesStore.clearMessages();
        this.userSerice.apiUsersUserIdAsChatGet$Json({id: message.ChatId})
            .subscribe(p => {
                this.chatsStore.addSelectedChat(p.Chat);
                console.log(p.Chat);
            })
    }

    getChat(message: ChatMessageDto) {
        this.messagesStore.clearMessages();
        this.chatsService.apiChatsChatIdGet$Json({ id: message.ChatId })
            .subscribe(p => this.chatsStore.addSelectedChat(p.Chat));
        this.signalRService.GetChatMessagesRange(message.ChatId, message.Id);
    }

    ngOnInit() {

    }
}