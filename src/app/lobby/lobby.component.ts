import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public playerId: string = "";
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/lottie-play-icon.json'
  };


  constructor(private webSocketService: WebsocketService, private router: Router) {
    webSocketService.messages.subscribe(msg => {
      console.log("Response from websocket");
      console.log(JSON.parse(msg.message));
    })
  }
  setGameMode(val: number) {
    console.log(`Value clicked: ${val}`)
  }
  ngOnInit(): void {
    this.playerId = sessionStorage.getItem("playerId")!;
    console.log(`Player id: ${this.playerId}`);
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
    this.webSocketService.messages.next({ action: "rooms/create", message: localStorage.getItem("roomId")! })
    this.router.navigate(['x01', localStorage.getItem("roomId")])
  }

  public signOut(): void {
    Auth.signOut({ global: true });
  }
}

window.addEventListener("scroll", function () {

  const maxHeight = document.body.scrollHeight - window.innerHeight;
  const max = (window.pageYOffset * 100) / maxHeight;
  var bar = this.document.getElementById('secretStatusBar')!;
  if (max > 26) {
    bar!.style.position = "fixed";
    bar!.style.top = "0";
    bar!.style.left = "0";
    bar!.style.zIndex = "1";
    bar!.style.backgroundColor = "white";
    bar!.style.width = "100%";
  } else if (max <= 26) {
    bar!.style.position = "unset"
  }

});