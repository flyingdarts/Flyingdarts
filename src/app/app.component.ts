import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Observable, of } from 'rxjs';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { FacebookService } from './services/facebook.service';
import { OnboardingStateService } from './services/onboarding-state.service';
import { OnboardingApiService } from './services/onboarding-api.service';
import { WebSocketService } from './services/websocket.service';
import { WebSocketActions } from './websocket/websocket.actions';
import { UserProfileService } from './services/user-profile.service';
import { UserProfileDetails } from './websocket/requests/users/user.profile.details';
import { Router } from '@angular/router';
declare const FB: any; // Declare the FB object

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public isRegistered: boolean = false;
  public userName$: Observable<string | null> = of("")
  public currentYear: number = new Date().getFullYear();
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };

  constructor(
    private router: Router,
    private amplifyAuthService: AmplifyAuthService, 
    private onboardingApiService: OnboardingApiService, 
    private webSocketService: WebSocketService,
    private userProfileService: UserProfileService) {
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  async ngOnInit() {
    // If authenticated with amplify authenticator
    this.amplifyAuthService.getUser().then(user => {
      // Fetch user profile for logged in user
      this.onboardingApiService.getUserProfile(user!.username);
    });

    // Subscribe on messages
    this.webSocketService.getMessages().subscribe(x=> {
      // Response from v2/user/profile/get
      if (x.action === WebSocketActions.UserProfileGet) {
        var message = (x.message as UserProfileDetails);
        this.userProfileService.currentUserProfileDetails = message;
      }
    })
     
    console.log(this.userProfileService.currentUserProfileDetails);
    this.userName$ = of(this.userProfileService.currentUserProfileDetails.UserName);
    this.isLoggedIn = await this.getLoginStatus();
  }
  title = 'flyingdarts';

  public signOut(): void {
    this.amplifyAuthService.signOut();
  }

  async getLoginStatus(): Promise<boolean> {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch(error) {
      return false;
    }
  }

  openLoginOrRegister(): void {
    this.router.navigate(['/', 'onboarding', 'welcome', 'new-users'])
  }
  navigateTo(wher: number): void {
    switch(wher){
      case 1:
        this.router.navigate(['/', 'onboarding', 'welcome', 'new-users'])
        break;
      case 2:
        this.router.navigate(['/', 'onboarding', 'welcome', 'new-users', { outlets: { 'onboarding-outlet': ['profile']}}])
        break;
      case 3:
        this.router.navigate(['/', 'onboarding', 'welcome', 'new-users', { outlets: { 'onboarding-outlet': ['camera']}}])
        break;
    }

  }
}
export function isNullOrUndefined(value: any): boolean {
  return value == null || value == undefined
}