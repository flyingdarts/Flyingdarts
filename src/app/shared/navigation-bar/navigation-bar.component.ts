import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyAuthService } from './../../services/amplify-auth.service';
import { UserProfileStateService } from './../../services/user-profile-state.service';
import { AnimationOptions } from 'ngx-lottie';
import { WebSocketService } from "./../../infrastructure/websocket/websocket.service";
import { isNullOrUndefined } from 'src/app/app.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  public currentYear: number = new Date().getFullYear();
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };
  public userName: string = ''; // Initial value is an empty string
  public isAuthenticated!: boolean; // Initial value is false
  public isRegistered!: boolean; // Initial value is false

  constructor(
    public router: Router,
    public amplifyAuthService: AmplifyAuthService, 
    public userProfileService: UserProfileStateService,
    public webSocketService: WebSocketService
  ) {

  }

  ngOnInit() {
   if (!isNullOrUndefined(this.userProfileService.currentUserProfileDetails.UserId)) {
    this.isRegistered = true;
    this.userName = this.userProfileService.currentUserProfileDetails.UserName;
   }
  }
  
  title = 'flyingdarts';

  public signOut(): void {
    this.userProfileService.clear();
    this.amplifyAuthService.signOut();
  }
}
