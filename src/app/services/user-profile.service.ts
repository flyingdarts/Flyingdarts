import { Injectable } from '@angular/core';
import { UserProfileDetails } from '../websocket/requests/users/user.profile.details';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private storage = localStorage;

  public clear(): void {
    this.storage.removeItem('UserStateService.UserProfileDetails');
  }

  public get currentUserProfileDetails(): UserProfileDetails {
    const key = 'UserStateService.UserProfileDetails';
    const serializedRequest = JSON.parse(this.storage.getItem(key)!);
    return serializedRequest;
  }

  public set currentUserProfileDetails(value: UserProfileDetails) {
    const key = 'UserStateService.UserProfileDetails';
    this.storage.setItem(key, JSON.stringify(value));
  }
}
