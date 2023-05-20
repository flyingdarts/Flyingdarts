import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebSocketActions } from '../infrastructure/websocket/websocket.actions.enum';
import { WebSocketMessage } from '../infrastructure/websocket/websocket.message.model';
import { WebSocketRequest } from '../infrastructure/websocket/websocket.request.model';

@Injectable()
export class WebSocketMessageService {
  private messageQueue: any[] = [];
  private isConnected = false;
  private isProcessing = false;

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.connected$.subscribe((connected: boolean) => {
      this.isConnected = connected;
      if (connected) {
        this.processMessageQueue();
      }
    });
  }

  sendMessage(message: any): void {
    if (this.isConnected) {
      this.webSocketService.postMessage(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  private processMessageQueue(): void {
    if (this.isProcessing || !this.isConnected || this.messageQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    const message = this.messageQueue[0];
    this.webSocketService.postMessage(message);

    this.webSocketService.connected$
      .pipe(first())
      .subscribe((connected: boolean) => {
        if (connected) {
          this.messageQueue.shift();
        }
        this.isProcessing = false;
        this.processMessageQueue();
      });
  }
}
