
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { BaseApiSettingsService } from '../../settings/BaseApiSettings.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private loggedIn: boolean;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router,
        private config: BaseApiSettingsService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(this.config.defaultUrl + `api/tokens`, { email, password })
            .pipe(map(user => {
                if (user && user.Token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    
                }

                return user;
            }));
    }

    sendToRestApiMethod(token: string) : void {
        this.http.post<User>("https://localhost:44312/api/tokens/google",
           {
              Token: token
           }
        ).subscribe(
           onSuccess => {
            if (onSuccess && onSuccess.Token) {
                localStorage.setItem('currentUser', JSON.stringify(onSuccess));
                this.currentUserSubject.next(onSuccess);
                this.router.navigate(['/']);
            }
           }, onFail => {
              console.log(onFail);
           }
        );
     }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
        .then(user => {
            this.sendToRestApiMethod(user.idToken);
        });
      }

    logout() {
        if(this.loggedIn){
            this.loggedIn = false;
            this.authService.signOut();
        }
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}