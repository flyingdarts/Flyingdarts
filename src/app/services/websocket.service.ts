import { Subject, Observable } from 'rxjs';

export interface WebSocketMessage<T = unknown> {
  type: string;
  payload?: unknown;
}

export class WebSocketService<T = unknown> {
  private socket: WebSocket;
  private connected = false;
  private messages = new Subject<WebSocketMessage<T>>();

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080');
    this.connect();
  }

  private connect(): void {

    this.socket.onopen = (event) => {
      this.connected = true;
      this.messages.next({ type: 'OnConnect', payload: event as unknown });
    };

    this.socket.onclose = (event) => {
      this.connected = false;
      this.messages.next({ type: 'OnDisconnect', payload: event as unknown });
      setTimeout(() => this.connect(), 1000);
    };

    this.socket.onerror = (event) => {
      this.messages.next({ type: 'OnDefault', payload: event as unknown });
    };

    this.socket.onmessage = (event) => {
      this.messages.next({ type: 'OnDefault', payload: JSON.parse(event.data) as unknown });
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
