import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AnimationOptions } from 'ngx-lottie/lib/symbols';
import { FormControl, FormGroup } from '@angular/forms';
import { WebSocketService } from 'src/app/services/websocket.service';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';
import { MessageRequest } from 'src/app/infrastructure/websocket/websocket.request.model';
import { WebSocketStatus } from 'src/app/infrastructure/websocket/websocket.status.enum';
import { X01ApiService } from '../services/x01-api.service';
import { JoinX01QueueCommand } from '../requests/JoinX01QueueCommand';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public messages: MessageRequest[] = [];
  public webSocketStatus: WebSocketStatus = WebSocketStatus.Unknown
  public clientId: string = ""
  public playerId: string = "";
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/play.json'
  };
  public shouldHideLoader: boolean = true;
  public messageForm = new FormGroup({
    message: new FormControl(''),
  });
  constructor(
    private x01ApiService: X01ApiService,
    private router: Router,
    private webSocketService: WebSocketService
  ) {
    this.clientId = uuidv4();
  }

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe(x=> {
      switch(x.action) {
        case WebSocketActions.Connect:
          this.webSocketStatus = WebSocketStatus.Connected
          break;
        case WebSocketActions.Default:
          this.messages.push(x.message! as MessageRequest)
          break;
        case WebSocketActions.Disconnect:
          this.webSocketStatus = WebSocketStatus.Disconnected
          break;
        case WebSocketActions.X01JoinQueue:
          this.shouldHideLoader = !this.shouldHideLoader;
          this.router.navigate(['/', 'games', { outlets: { 'games-outlet': ['x01', (x.message as JoinX01QueueCommand).GameId]}}]);
        break;
      }
    })
  }

  public joinX01Queue() {
    this.shouldHideLoader = !this.shouldHideLoader;
    this.x01ApiService.joinQueue(this.clientId);
  }

  public sendMessage() {
    console.log("Sending message", {
      date: new Date(),
      message: this.messageForm.value.message,
      owner: this.clientId,
    });
    this.webSocketService.postMessage(JSON.stringify({
      action: "message",
      message: {
        date: new Date(),
        message: this.messageForm.value.message,
        owner: this.clientId,
      }
    }))
  }
  public signOut(): void {
    Auth.signOut({ global: true });
  }
}
