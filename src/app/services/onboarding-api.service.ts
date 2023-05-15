import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
@Injectable({ providedIn: 'root' })
export class OnboardingApiService {
  constructor(private webSocketService: WebSocketService) {}

//   public createX01Game(createGameCommand: any): void {
//     this.webSocketService.postMessage(JSON.stringify({action: 'v2/games/x01/create', message: createGameCommand}));
//   }

//   public updateX01Game(updateGameCommand: any): void {
//     this.webSocketService.postMessage(JSON.stringify({action: 'v2/games/x01/update', message: updateGameCommand}));
//   }

//   public createRoom(createRoomCommand: any): void {
//     this.webSocketService.postMessage(JSON.stringify({action: 'v2/rooms/create', message: createRoomCommand}));
//   }

//   public updateRoom(updateRoomCommand: any): void {
//     this.webSocketService.postMessage(JSON.stringify({action: 'v2/rooms/update', message: updateRoomCommand}));
//   }

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
