import { Component, OnInit } from '@angular/core';
import { WebSocketStatus } from '../../../websocket/websocket.status';
import { WebSocketService } from '../../../services/websocket.service';
import { WebSocketActions } from '../../../websocket/websocket.actions';
import { MessageRequest } from '../../../websocket/websocket.request';
import { FormControl, FormGroup } from '@angular/forms';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],

})

export class ChatComponent implements OnInit {
  public messages: MessageRequest[] = [];
  public webSocketStatus: WebSocketStatus = WebSocketStatus.Unknown
  public clientId: string = ""

  constructor(
    private webSocketService: WebSocketService) {
  }

  messageForm = new FormGroup({
    message: new FormControl(''),
  });

  ngOnInit(): void {
    this.clientId = uuidv4();
    this.webSocketService.getMessages()
      .subscribe(x => {
        switch (x.action) {
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