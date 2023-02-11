import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { ApiService } from 'src/app/services/api.service';
import { PlayerLocalStorageService } from 'src/app/services/player.local-storage.service';

var randomstring = require("randomstring");

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public playerId: string = "";
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/play.json'
  };

  constructor(
    private playerLocalStorageService: PlayerLocalStorageService,
    private amplifyAuthService: AmplifyAuthService,
    private apiService: ApiService,
    private router: Router,
  ) {

  }
  
  ngOnInit(): void {
    this.amplifyAuthService.getUser().then((user: any) => {
      this.playerLocalStorageService.setUserId(user.attributes.sub);
      this.playerLocalStorageService.setUserName(user.attributes.name);
    });
  }

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  createRoom() {
    var roomId = randomstring.generate(7)
    this.apiService.roomsOnCreate(roomId)
    this.router.navigate(['x01', roomId]);
  }

  public signOut(): void {
    Auth.signOut({ global: true });
  }
}