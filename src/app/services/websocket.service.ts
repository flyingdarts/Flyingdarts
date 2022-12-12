import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

export interface Message {
  action: string;
  message: string;
}

@Injectable()
export class WebsocketService {
  private subject!: AnonymousSubject<MessageEvent>;
  public messages: Subject<Message>;

  constructor() {
    this.messages = <Subject<Message>>this.connect(environment.webSocketUrl).pipe(
      map(
        (response: MessageEvent): Message => {
          console.log(response.data);
          return { action: "onreceive", message: response.data };
        }
      )
    )
  }

  public connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log(`Successfully connected: ${url}`)
    }
    return this.subject;
  }
  public create(url: string): AnonymousSubject<MessageEvent> {
    let webSocket = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      webSocket.onmessage = obs.next.bind(obs);
      webSocket.onerror = obs.error.bind(obs);
      webSocket.onclose = obs.complete.bind(obs);
      return webSocket.close.bind(webSocket);
    });
    let observer = {
      error: () => { },
      complete: () => { },
      next: (data: Object) => {
        console.log(`Message sent to websocket:`, data);
        if (webSocket.readyState === WebSocket.OPEN) {
          webSocket.send(JSON.stringify(data));
        }
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
