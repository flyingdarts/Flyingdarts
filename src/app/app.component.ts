import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketService } from './websocket/websocket.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageRequest, WebSocketStatus, WebSocketActions } from './websocket/WebSocketMessage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public messages: MessageRequest[] = [];
  public webSocketStatus: WebSocketStatus = WebSocketStatus.Unknown
  public clientId: string = ""
  
  constructor(
    private webSocketService: WebSocketService) {
  }

  messageForm = new FormGroup({
    message: new FormControl(''),
  })
  ngOnInit(): void {
    this.clientId = uuidv4();
    this.webSocketService.getMessages()
        .subscribe(x => {
          switch(x.action){
            case WebSocketActions.Connect:
              this.webSocketStatus = WebSocketStatus.Connected
              break;
            case WebSocketActions.Default:
              this.messages.push(JSON.parse(x.message! as string) as MessageRequest)
              break;
            case WebSocketActions.Disconnect:
              this.webSocketStatus = WebSocketStatus.Disconnected
              break;
          }
        })
  }

  public send() {
    this.webSocketService.postMessage(JSON.stringify({
      action: "message",
      message: {
        date: new Date(),
        message: this.messageForm.value.message,
        owner: this.clientId,
      }
    }))
  }

}