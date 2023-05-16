import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebSocketActions } from '../infrastructure/websocket/websocket.actions.enum';
import { WebSocketMessage } from '../infrastructure/websocket/websocket.message.model';
import { WebSocketRequest } from '../infrastructure/websocket/websocket.request.model';

@Injectable()
export class WebSocketService<T = WebSocketRequest> {
  private socket: WebSocket;
  private connected = false;
  private messages = new Subject<WebSocketMessage<T>>();
  constructor() {
    this.socket = new WebSocket(environment.webSocketUrl);
    this.connect();
  }

  private connect(): void {

    this.socket.onopen = (event) => {
      console.log(event);
      this.connected = true;
      this.messages.next({ action: WebSocketActions.Connect, message: event as any });
    };

    this.socket.onclose = (event) => {
      console.log(event);
      this.connected = false;
      this.messages.next({ action: WebSocketActions.Disconnect, message: event as any });
      setTimeout(() => this.connect(), 1000);
    };

    this.socket.onerror = (event) => {
      console.log(event);
      this.messages.next({ action: WebSocketActions.Default, message: event as any });
    };

    this.socket.onmessage = (event) => {
      console.log(event);
      let message = JSON.parse(event?.data || "{}") ;
      this.messages.next({ action: message.action, message: message.message });
    };
  }

  public postMessage(payload: string): void {
    if (this.connected) {
      this.socket.send(payload);
    }
  }

  public getMessages(): Observable<WebSocketMessage<T>> {
    return this.messages.asObservable();
  }
}