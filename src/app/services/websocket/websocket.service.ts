import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerLocalStorageService } from '../player.local-storage.service';
import { WebSocketActions } from './WebSocketActions';
import { WebSocketMessage } from './WebSocketMessage';
import { WebSocketRequest } from './WebSocketRequest';

export class WebSocketService<T = WebSocketRequest> {
  private socket: WebSocket;
  private connected = false;
  private messages = new Subject<WebSocketMessage<T>>();

  constructor(private localStorageService: PlayerLocalStorageService) {
    this.socket = new WebSocket(environment.webSocketUrl);
    this.connect();
  }

  private connect(): void {

    this.socket.onopen = (event) => {
      this.connected = true;
      var message: any = {};
      message = event;
      message.UserId = this.localStorageService.getUserId();
      this.messages.next({ action: WebSocketActions.Connect, message: event as any });
    };

    this.socket.onclose = (event) => {
      this.connected = false;
      this.messages.next({ action: WebSocketActions.Disconnect, message: event as any });
      setTimeout(() => this.connect(), 1000);
    };

    this.socket.onerror = (event) => {
      this.messages.next({ action: WebSocketActions.Default, message: event as any });
    };

    this.socket.onmessage = (event) => {
      console.log("onmessage", event);
      let message = JSON.parse(event.data);
      this.messages.next({ action: message.action, message: message.message, metadata: message.metadata });
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