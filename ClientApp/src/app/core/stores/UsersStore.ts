import { observable, computed, action, toJS } from "mobx";
import { Injectable } from '@angular/core';
import { UserDto, ProfileInfoDto } from '../api/models';

@Injectable()
export class UsersStore {
    @observable private Users: UserDto[] = [];
    // @observable ChatUsers: UserDto[] = [];
    @observable private DetailUserId: number;
    
    @observable private EditUserProfile: ProfileInfoDto;

    @observable private showProfile = false;

    @computed get AllUsers(): UserDto[] {
        return toJS(this.Users);
    }

    @computed get UserProfile(): ProfileInfoDto{
        return toJS(this.EditUserProfile);
    }

    @computed get GetDetailUserId(): number {
        return this.DetailUserId;
    }

    @computed get CanShowProfile(): boolean{
        return this.showProfile;
    }

    @action ShowProfile(){
        this.showProfile = true;
    }

    @action HideProfile(){
        this.showProfile = false;
    }

    // @action setUsers(users: UserDto[]){
    //     this.Users = [...users.filter(p => this.ChatUsers.findIndex(z => z.Id == p.Id) === -1)];
    // }
    @action setDetailUserId(userId: number){
        this.DetailUserId = userId;
    }

    @action SetEditProfile(profile: ProfileInfoDto){
        this.EditUserProfile = profile;
    }

    @action ClearEditProfile(){
        this.EditUserProfile = null;
    }

    @action setUsers(users: UserDto[]) {
        this.Users = [...users];
    }

    @action ClearUserProfileId(){
        this.DetailUserId = 0;
    }

    @action clearUsers() {
        this.Users = [];
    }
}