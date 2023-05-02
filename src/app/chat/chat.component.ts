import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { WebSocketActions } from '../websocket/WebSocketActions';
import { MessageRequest } from '../websocket/WebSocketRequest';
import { WebSocketStatus } from '../websocket/WebSocketStatus';
import { WebSocketService } from '../websocket/websocket.service';
var uuidv4 = require('uuid');

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
