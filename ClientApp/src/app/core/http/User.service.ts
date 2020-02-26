import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { BaseApiSettingsService } from 'src/app/settings/BaseApiSettings.service';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private config: BaseApiSettingsService
        ) { }

    getAll() {
        return this.http.get<User[]>(this.config.defaultUrl + `/api/users`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

}