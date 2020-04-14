import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../services/Alert.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'alert-component',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success mb-0';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger mb-0';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}