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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentYear: number = new Date().getFullYear();
  public currentVersion: string = "";

  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };

  constructor(
    private authService: AmplifyAuthService,
    private userProfileApi: UserProfileApiService,
    private userProfileState: UserProfileStateService,
    private webSocketService: WebSocketService) {
    this.currentVersion = packageJson.version;
  }
  async ngOnInit() {
    try {
      var cognitoUserId = await this.authService.getCognitoUserId();
      this.userProfileApi.getUserProfile(cognitoUserId);
      this.webSocketService.getMessages().subscribe(x => {
        switch(x.action) {
          case WebSocketActions.UserProfileGet:
          case WebSocketActions.UserProfileCreate:
          case WebSocketActions.UserProfileUpdate:
            if (x.message != null) {
              this.userProfileState.currentUserProfileDetails = (x.message as UserProfileDetails)
            }
          break;
        }
      })
    } catch(err) {
      console.log(err);
    }
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  title = 'Flyingdarts';

}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}



