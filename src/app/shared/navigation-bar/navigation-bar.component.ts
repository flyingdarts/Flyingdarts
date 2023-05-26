import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AmplifyAuthService } from './../../services/amplify-auth.service';
import { UserProfileStateService } from './../../services/user-profile-state.service';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { WebSocketService } from "./../../infrastructure/websocket/websocket.service";
import { AppStore } from 'src/app/app.store';

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
    public userProfileService: UserProfileStateService,
    public webSocketService: WebSocketService,
    private appStore: AppStore
  ) {}

  ngOnInit() {
    this.appStore.profile$.subscribe(x=> {
      this.isRegistered = x != null;
      this.userName = x!.UserName;
    })
  }
  
  title = 'flyingdarts';

  public signOut(): void {
    this.userProfileService.clear();
    this.amplifyAuthService.signOut();
  }
}
