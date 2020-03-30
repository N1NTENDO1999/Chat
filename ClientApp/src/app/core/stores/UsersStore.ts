import { observable, computed, action, toJS } from "mobx";
import { Injectable } from '@angular/core';
import { UserDto } from '../api/models';

@Injectable()
export class UsersStore {
    @observable Users: UserDto[] = [];
    // @observable ChatUsers: UserDto[] = [];
    @observable DetailUserId: number;

    @computed get AllUsers(): UserDto[] {
        return toJS(this.Users);
    }

    @computed get GetDetailUserId(): number {
        return this.DetailUserId;
    }

    // @action setUsers(users: UserDto[]){
    //     this.Users = [...users.filter(p => this.ChatUsers.findIndex(z => z.Id == p.Id) === -1)];
    // }
    @action setDetailUserId(userId: number){
        this.DetailUserId = userId;
    }

    @action setUsers(users: UserDto[]) {
        this.Users = [...users];
    }

    @action clearUsers() {
        this.Users = [];
    }
}