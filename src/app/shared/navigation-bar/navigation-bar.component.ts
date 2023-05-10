import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AnimationOptions } from 'ngx-lottie';

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

  constructor(
    public router: Router,
    public amplifyAuthService: AmplifyAuthService, 
    public userProfileService: UserProfileService) {
  }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  ngOnInit() {
    console.log(this.userProfileService.userName$);
    console.log(this.amplifyAuthService.isAuthenticated$);
    console.log(this.amplifyAuthService.isRegistered$);
  }
  
  title = 'flyingdarts';

  public signOut(): void {
    this.amplifyAuthService.signOut();
  }
}
