import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormFields } from '@aws-amplify/ui';
import { Auth } from 'aws-amplify';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { LocalStorageKeys, PlayerLocalStorageService } from './../../services/player.local-storage.service';
const { v4: uuidv4 } = require('uuid');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roomId?: string | null;
  private playerId?: string | null;
  private user: any
  public userName?: string | null;

  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };

  constructor(
    private playerLocalStorageService: PlayerLocalStorageService,
    private amplifyAuthService: AmplifyAuthService) {
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  ngOnInit(): void {
    this.amplifyAuthService.getUser().then((user: any) => {
      this.user = user.attributes;
      console.log(this.user);
      this.userName = this.user.name;
      this.playerLocalStorageService.setUserName(this.userName!)
    });
  }
  title = 'flyingdarts';

}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}