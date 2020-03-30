import { observable, computed, action, toJS } from "mobx";
import { Injectable } from '@angular/core';
import { UserDto, ProfileInfoDto } from '../api/models';

@Injectable()
export class UsersStore {
    @observable private Users: UserDto[] = [];
    // @observable ChatUsers: UserDto[] = [];
    @observable private DetailUserId: number;
    
    @observable private EditUserProfile: ProfileInfoDto;

    @computed get AllUsers(): UserDto[] {
        return toJS(this.Users);
    }

    @computed get UserProfile(): ProfileInfoDto{
        return toJS(this.EditUserProfile);
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

    @action SetEditProfile(profile: ProfileInfoDto){
        console.log(profile);
        this.EditUserProfile = profile;
    }

    @action ClearEditProfile(){
        this.EditUserProfile = null;
    }

    @action setUsers(users: UserDto[]) {
        this.Users = [...users];
    }

    @action clearUsers() {
        this.Users = [];
    }
}