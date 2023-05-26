import { Component, HostListener, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import packageJson from "./../../package.json";
import { UserProfileApiService } from './services/user-profile-api.service';
import { AmplifyAuthService } from './services/amplify-auth.service';
import { WebSocketService } from './infrastructure/websocket/websocket.service';
import { WebSocketActions } from './infrastructure/websocket/websocket.actions.enum';
import { UserProfileStateService as UserProfileStateService } from './services/user-profile-state.service';
import { UserProfileDetails } from './shared/models/user-profile-details.model';
import { AppStore } from "./app.store";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentYear: number = new Date().getFullYear();
  public currentVersion: string = "";

  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };

  constructor(
    private store: AppStore) {
    this.currentVersion = packageJson.version;
  }
  ngOnInit() {
    this.store.profile$.subscribe(x=>console.log("Store,Profile", x))
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  title = 'Flyingdarts';

}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}



