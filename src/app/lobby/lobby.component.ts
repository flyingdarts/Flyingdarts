import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { isNullOrUndefined } from '../app.component';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public players: IPlayer[] = []
  public player!: IPlayer
  public countryCode: string = ''

  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/lottie-play-icon.json'
  };


  constructor(private webSocketService: WebsocketService, private router: Router) {
    webSocketService.messages.subscribe(msg => {
      console.log("Response from websocket");
      console.log(JSON.parse(msg.message));
      this.countryCode = 'BE'.toLowerCase()
      if (JSON.parse(msg.message).action == "room/joined") {
        this.players.push({ id: JSON.parse(msg.message).message, country: this.countryCode })
      }
      if (JSON.parse(msg.message).action == "lobby/joined") {
        var playerIds: string[] = JSON.parse(msg.message).message;
        playerIds.forEach(x => this.players.push({ id: x, country: this.countryCode }))
      }
    })
  }
  setGameMode(val: number) {
    console.log(`Value clicked: ${val}`)
  }
  ngOnInit(): void {
    var playerId = sessionStorage.getItem("playerId");
    if (!isNullOrUndefined(playerId)) {
      this.player = {
        id: playerId!, country: this.countryCode
      }
    }
  }
  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  joinLobby() {
    this.players.push(this.player)
    this.webSocketService.messages.next({ action: "rooms/join", message: `lobby#${this.player.id}` })
  }

  createPlayerRoom() {
    this.webSocketService.messages.next({ action: "rooms/create", message: localStorage.getItem("roomId")! })
    this.router.navigate(['x01', localStorage.getItem("roomId")])
  }

  public signOut(): void {
    Auth.signOut({ global: true });
  }
}

export interface IPlayer {
  id: string
  country: string
}