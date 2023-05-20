import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { UserProfileStateService } from 'src/app/services/user-profile-state.service';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/services/websocket.service';
import { WebSocketActions } from 'src/app/infrastructure/websocket/websocket.actions.enum';
import { UserProfileDetails } from '../models/user-profile-details.model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  public currentYear: number = new Date().getFullYear();
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/flyingdarts_icon.json',
    loop: false
  };
  public userName: string = ''; // Initial value is an empty string
  public isAuthenticated: boolean = false; // Initial value is false
  public isRegistered: boolean = false; // Initial value is false
  
  private userProfileSubscription?: Subscription = undefined;
  private isAuthenticatedSubscription?: Subscription = undefined;
  private isRegisteredSubscription?: Subscription = undefined;

  constructor(
    public router: Router,
    public amplifyAuthService: AmplifyAuthService, 
    public userProfileService: UserProfileStateService,
    public webSocketService: WebSocketService
  ) {}

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit() {
    this.webSocketService.getMessages().subscribe(x=> {
      if (x.action === WebSocketActions.UserProfileGet) {
        this.userProfileService.currentUserProfileDetails = x.message as UserProfileDetails
      }
    })
    this.userProfileSubscription = this.userProfileService.userName$.subscribe(
      (userName: string) => {
        this.userName = userName;
        console.log("Username: ", this.userName);
      }
    );

    this.isAuthenticatedSubscription = this.amplifyAuthService.isAuthenticated$.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        console.log("Is authenticated: ", this.isAuthenticated);
      }
    );

    this.isRegisteredSubscription = this.userProfileService.isRegistered$.subscribe(
      (isRegistered: boolean) => {
        this.isRegistered = isRegistered;
        console.log("Is registered: ", this.isRegistered);
      }
    );
  }

  ngOnDestroy() {
    this.userProfileSubscription?.unsubscribe();
    this.isAuthenticatedSubscription?.unsubscribe();
    this.isRegisteredSubscription?.unsubscribe();
  }
  
  title = 'flyingdarts';

  public signOut(): void {
    this.amplifyAuthService.signOut();
  }
}
