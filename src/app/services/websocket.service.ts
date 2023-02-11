import { Subject, Observable } from 'rxjs';

export interface WebSocketMessage<T = any> {
  type: string;
  payload?: T;
}

export class WebSocketService<T = any> {
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
      this.messages.next({ type: 'OnConnect', payload: event as T });
    };

    this.socket.onclose = (event) => {
      this.connected = false;
      this.messages.next({ type: 'OnDisconnect', payload: event as T });
      setTimeout(() => this.connect(), 1000);
    };

    this.socket.onerror = (event) => {
      this.messages.next({ type: 'OnDefault', payload: event as T });
    };

    this.socket.onmessage = (event) => {
      this.messages.next({ type: 'OnDefault', payload: JSON.parse(event.data) as T });
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
