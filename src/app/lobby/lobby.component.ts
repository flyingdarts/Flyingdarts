import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AnimationOptions } from 'ngx-lottie/lib/symbols';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { ApiService } from 'src/app/services/api.service';
import { PlayerLocalStorageService } from 'src/app/services/player.local-storage.service';
import { filter } from "rxjs"
import { FormControl, FormGroup } from '@angular/forms';
import { WebSocketService } from 'src/app/services/websocket.service';
import { CreateRoomRequest } from 'src/app/websocket/requests/rooms/rooms.create.request';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';
import { MessageRequest } from 'src/app/infrastructure/websocket/websocket.request.model';
import { WebSocketStatus } from 'src/app/infrastructure/websocket/websocket.status.enum';
import { X01ApiService } from '../services/x01-api.service';
import { JoinRoomRequest } from '../websocket/requests/rooms/rooms.join.request';
import { JoinX01QueueRequest } from '../websocket/requests/x01/x01-joinqueue.request';
var randomstring = require("randomstring");
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
  public privateRoomId: FormControl;
  public playerId: string = "";
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/play.json'
  };
  public shouldHideLoader: boolean = true;
  public messageForm = new FormGroup({
    message: new FormControl(''),
  });
  constructor(
    private playerLocalStorageService: PlayerLocalStorageService,
    private amplifyAuthService: AmplifyAuthService,
    private apiService: ApiService,
    private x01ApiService: X01ApiService,
    private router: Router,
    private webSocketService: WebSocketService
  ) {
    this.privateRoomId = new FormControl("");
    this.clientId = uuidv4();
    this.webSocketService.getMessages()
      .subscribe(x => {
        console.log(x);
        switch (x.action) {
          case WebSocketActions.Connect:
            this.webSocketStatus = WebSocketStatus.Connected
            break;
          case WebSocketActions.Default:
            this.messages.push(x.message! as MessageRequest)
            break;
          case WebSocketActions.Disconnect:
            this.webSocketStatus = WebSocketStatus.Disconnected
            break;
        }
      })
  }

  ngOnInit(): void {
    // this.amplifyAuthService.getUser().then((user: any) => {
    //   this.playerLocalStorageService.setUserId(user.attributes.sub);
    //   this.playerLocalStorageService.setUserName(user.attributes.name);
    // });

    this.webSocketService.getMessages()
      .pipe(filter(a => a.action === WebSocketActions.X01QueueJoin))
      .subscribe((x) => {
        this.shouldHideLoader = !this.shouldHideLoader;
        this.router.navigate(['/', 'games', { outlets: { 'games-outlet': ['x01', (x.message as JoinX01QueueRequest).RoomId]}}]);

      })
  }

  public joinX01Queue() {
    this.shouldHideLoader = !this.shouldHideLoader;
    this.x01ApiService.joinX01Queue({GamePlayerId: this.clientId})
  }

  public joinRoom() {
    console.log("join room clicked", this.privateRoomId.value);
    this.router.navigate(['/', 'games', { outlets: { 'games-outlet': ['x01', this.privateRoomId.value]}}]);0
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
