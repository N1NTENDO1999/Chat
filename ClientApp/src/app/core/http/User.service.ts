import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { BaseApiSettingsService } from 'src/app/settings/BaseApiSettings.service';
import { UserDTO } from './DTOs/UserDTO';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private config: BaseApiSettingsService
        ) { }

    getAll() {
        return this.http.get<User[]>(this.config.defaultUrl + `/api/users`);
    }

    register(user: UserDTO) {
        return this.http.post(this.config.defaultUrl + `api/users`, user);
    }

}