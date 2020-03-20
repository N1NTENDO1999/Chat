import { observable, computed, action, toJS } from "mobx";
import { Injectable } from '@angular/core';
import { UserDto } from '../api/models';

@Injectable()
export class UsersStore{
    @observable Users: UserDto[] = [];
    @observable ChatUsers: UserDto[] = [];

    @computed get AllUsers(): UserDto[]{
        return toJS(this.Users);
    }

    @action setUsers(users: UserDto[]){
        this.Users = [...users.filter(p => this.ChatUsers.findIndex(z => z.Id == p.Id) === -1)];
    }
}