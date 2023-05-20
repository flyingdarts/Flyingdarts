import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { WebSocketActions } from '../infrastructure/websocket/websocket.actions.enum';
import { WebSocketMessage } from 'src/app/infrastructure/websocket/websocket.message.model';
import { CreateX01ScoreCommand } from 'src/app/requests/CreateX01ScoreCommand';
import { JoinX01QueueCommand } from 'src/app/requests/JoinX01QueueCommand';
import { JoinGameCommand } from 'src/app/requests/JoinGameCommand';

@Injectable({ providedIn: 'root' })
export class X01ApiService {
  constructor(private webSocketService: WebSocketService) {

  }
  public joinGame(gameId: string, playerId: string, playerName: string) {
    console.log("join x01 game");
    var message: JoinGameCommand = {
        GameId: gameId,
        PlayerId: playerId,
        PlayerName: playerName
    };
    let body: WebSocketMessage<JoinGameCommand> = {
        action: WebSocketActions.X01Join,
        message: message
    };
    console.log(body);
    this.webSocketService.postMessage(JSON.stringify(body));
  }

  public joinQueue(gamePlayerId: string, roomId?: string) {
    var message: JoinX01QueueCommand = {
      PlayerId: gamePlayerId,
    };
    if (!!roomId) 
      message.GameId = roomId;
      
    let body: WebSocketMessage<JoinX01QueueCommand> = {
      action: WebSocketActions.X01JoinQueue,
      message: message
    };
    this.webSocketService.postMessage(JSON.stringify(body));
  }

  public score(gameId: string, playerId: string, score: number, input: number) {
    var message: CreateX01ScoreCommand = {
      GameId: gameId,
      PlayerId: playerId,
      Score: score,
      Input: input
    };
    let body: WebSocketMessage<CreateX01ScoreCommand> = {
      action: WebSocketActions.X01Score,
      message: message
    };
    this.webSocketService.postMessage(JSON.stringify(body));
  }
}