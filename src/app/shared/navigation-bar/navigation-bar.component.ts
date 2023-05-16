import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';

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
  public isAuthenticated: boolean = false; // Initial value is false
  public isRegistered: boolean = false; // Initial value is false
  
  private userProfileSubscription?: Subscription = undefined;
  private isAuthenticatedSubscription?: Subscription = undefined;
  private isRegisteredSubscription?: Subscription = undefined;

  constructor(
    public router: Router,
    public amplifyAuthService: AmplifyAuthService, 
    public userProfileService: UserProfileService
  ) {}

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit() {
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

    this.isRegisteredSubscription = this.amplifyAuthService.isRegistered$.subscribe(
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
