import { Injectable } from '@angular/core';

import { WebSocketActions } from '../infrastructure/websocket/websocket.actions.enum';
import { WebSocketMessage } from '../infrastructure/websocket/websocket.message.model';
import { CreateUserProfileCommand } from './../requests/CreateUserProfileCommand';
import { GetUserProfileCommand } from './../requests/GetUserProfileCommand';
import { UpdateUserProfileCommand } from './../requests/UpdateUserProfileCommand';
import { WebSocketMessageService } from '../infrastructure/websocket/websocket-message.service';
@Injectable({ providedIn: 'root' })
export class UserProfileApiService {
  constructor(private webSocketMessagingService: WebSocketMessageService) {

  }
  public createUserProfile(cognitoUserId: string, email: string, userName: string, country: string): void {
    var message: CreateUserProfileCommand = {
      CognitoUserId: cognitoUserId,
      UserName: userName,
      Email: email,
      Country: country
    };
    let body: WebSocketMessage<CreateUserProfileCommand> = {
      action: WebSocketActions.UserProfileCreate,
      message: message
    };
    this.webSocketMessagingService.sendMessage(JSON.stringify(body));
  }

  public getUserProfile(cognitoUserId: string): void {
    var message: GetUserProfileCommand = {
      CognitoUserId: cognitoUserId
    };
    let body: WebSocketMessage<GetUserProfileCommand> = {
      action: WebSocketActions.UserProfileGet,
      message: message
    };
    this.webSocketMessagingService.sendMessage(JSON.stringify(body));
  }

  public updateUserProfile(cognitoUserId: string, email: string, userName: string, country: string): void {
    var message: UpdateUserProfileCommand = {
      CognitoUserId: cognitoUserId,
      UserName: userName,
      Email: email,
      Country: country
    };
    let body: WebSocketMessage<UpdateUserProfileCommand> = {
      action: WebSocketActions.UserProfileUpdate,
      message: message
    };
    this.webSocketMessagingService.sendMessage(JSON.stringify(body));
  }
}



