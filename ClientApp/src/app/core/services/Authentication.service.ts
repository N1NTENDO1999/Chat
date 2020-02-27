
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { BaseApiSettingsService } from 'src/app/settings/BaseApiSettings.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable()
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private loggedIn: boolean;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
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
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.authService.authState.subscribe((user) => {
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            //this.currentUserSubject.next(user);
            this.loggedIn = (user != null);
          });
          console.log(JSON.parse(localStorage.getItem('currentUser')));
      }

    logout() {
        // remove user from local storage to log user oust
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}