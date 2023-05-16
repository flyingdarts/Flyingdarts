import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';




@Injectable({ providedIn: 'root' })
export class X01ApiService {
  constructor(private webSocketService: WebSocketService) {
  }
  public createX01Game(createGameCommand: any): void {
    this.webSocketService.postMessage(JSON.stringify({ action: 'v2/games/x01/create', message: createGameCommand }));
  }
  public joinX01Queue(joinX01QueueCommand: any): void {
    this.webSocketService.postMessage(JSON.stringify({action: 'v2/games/x01/joinqueue', message: joinX01QueueCommand}));
  }
}
