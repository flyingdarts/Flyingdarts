import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface WebSocketMessage<T = any> {
  action: string;
  message?: Request;
}

export class WebSocketService<T = any> {
  private socket: WebSocket;
  private connected = false;
  private messages = new Subject<WebSocketMessage<T>>();

  constructor() {
    this.socket = new WebSocket(environment.webSocketUrl);
    this.connect();
  }

  private connect(): void {

    this.socket.onopen = (event) => {
      this.connected = true;
      this.messages.next({ action: 'connect$', message: event as any });
    };

    this.socket.onclose = (event) => {
      this.connected = false;
      this.messages.next({ action: 'disconnect$', message: event as any });
      setTimeout(() => this.connect(), 1000);
    };

    this.socket.onerror = (event) => {
      this.messages.next({ action: 'default', message: event as any });
    };

    this.socket.onmessage = (event) => {
      this.messages.next({ action: 'default', message: JSON.parse(event.data) as any });
    };
  }

  public postMessage(payload: T): void {
    if (this.connected) {
      this.socket.send(JSON.stringify({ payload }));
    }
  }

  public getMessages(): Observable<WebSocketMessage<T>> {
    return this.messages.asObservable();
  }
}
