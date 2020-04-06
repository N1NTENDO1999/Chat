import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrService } from 'src/app/core/signalR/SignalR.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'messages-search-component',
    templateUrl: './messages-search.component.html',
    styleUrls: ['./messages-search.component.css']
})
export class MessagesSearchComponent implements OnInit, OnDestroy {

    private _searchSubject: Subject<string> = new Subject();

    constructor(
        private signalRService: SignalrService,

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
            }
        });
    }

    public updateSearch(searchTextValue: string) {
        this._searchSubject.next(searchTextValue);
    }

    ngOnInit() {

    }

    search(term: string): void {
        if (term.trim()) {
            console.log(term);
        }
    }

}