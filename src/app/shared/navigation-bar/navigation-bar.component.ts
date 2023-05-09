import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { Observable, of } from 'rxjs';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { OnboardingApiService } from 'src/app/services/onboarding-api.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { WebSocketService } from 'src/app/services/websocket.service';
import { UserProfileDetails } from '../models/user-profile-details.model';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public isRegistered: boolean = false;
  public userName$: Observable<string | null> = of("")
  public currentYear: number = new Date().getFullYear();
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };

  constructor(
    public router: Router,
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
    var cognitoUser = await this.amplifyAuthService.getUser();
    if (!!cognitoUser) {
        // Fetch user profile for logged in user
        console.log("lol");
        this.onboardingApiService.getUserProfile(cognitoUser!.getUsername());
    }
    this.isLoggedIn = !!cognitoUser;

    // Subscribe on messages
    this.webSocketService.getMessages().subscribe(x=> {
      // Response from v2/user/profile/get
      if (x.action === WebSocketActions.UserProfileGet) {
        // Insert details into localStorage
        this.userProfileService.currentUserProfileDetails = x.message as UserProfileDetails;
        this.isRegistered = !!(x.message as UserProfileDetails)
      }
    })
    
    // Check if we have a profile stored already.
    if (this.userProfileService.currentUserProfileDetails) {
      // If so set the userName
      this.userName$ = of(this.userProfileService.currentUserProfileDetails.UserName);
    }
      
  }
  
  title = 'flyingdarts';

  public signOut(): void {
    this.amplifyAuthService.signOut();
  }
}
