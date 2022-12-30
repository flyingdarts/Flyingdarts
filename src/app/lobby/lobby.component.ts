import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { LocalStorageKeys } from '../services/player.local-storage.service';
import { WebsocketService } from '../services/websocket.service';
import { LobbyApiService } from './lobby-api.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {
  public playerId: string = "";
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/play.json'
  };


  constructor(
    private webSocketService: WebsocketService,
    private lobbyApiService: LobbyApiService,
    private router: Router,
  ) {
    webSocketService.messages.subscribe(msg => {
      console.log("Response from websocket");
      console.log(JSON.parse(msg.message));
    })
  }
  setGameMode(val: number) {
    switch (val) {
      case 1:
        this.lobbyApiService.enqueueUser().subscribe((x: {}) => {
          this.router.navigate(['x01', this.playerId])
        });
        break;
    }
    console.log(`Value clicked: ${val}`)
  }
  ngOnInit(): void {
    this.playerId = sessionStorage.getItem("playerId")!;
    console.log(`Player id: ${this.playerId}`);

  }
  ngOnDestroy(): void {
    window.removeEventListener("scroll", () => { });
  }
  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  joinLobby() {
    this.playerId = sessionStorage.getItem("playerId")!;
    console.log(`Player id: ${this.playerId}`);
  }

  createPlayerRoom() {
    var message = `${localStorage.getItem("roomId")!}#${sessionStorage.getItem(LocalStorageKeys.UserId)}#${localStorage.getItem(LocalStorageKeys.UserName)}`
    this.webSocketService.messages.next({ action: "rooms/create", message: message })
    this.router.navigate(['x01', localStorage.getItem("roomId")])
  }

  public signOut(): void {
    Auth.signOut({ global: true });
  }
}