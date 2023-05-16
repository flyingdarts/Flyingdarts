import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
@Injectable({ providedIn: 'root' })
export class UserProfileApiService {
  constructor(private webSocketService: WebSocketService) {}
  public createUserProfile(createUserProfileCommand: any): void {
    this.webSocketService.postMessage(JSON.stringify({action: 'v2/user/profile/create', message: createUserProfileCommand}));
  }

  public getUserProfile(cognitoUserId: string): void {
    this.webSocketService.postMessage(JSON.stringify({action: 'v2/user/profile/get', message: { CognitoUserId: cognitoUserId}}));
  }

  public updateUserProfile(updateUserProfileCommand: any): void {
    this.webSocketService.postMessage(JSON.stringify({action: 'v2/user/profile/update', message: updateUserProfileCommand}));
  }
}



