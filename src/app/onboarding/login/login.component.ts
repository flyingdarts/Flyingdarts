import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Subscription } from 'rxjs';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { OnboardingStateService } from 'src/app/services/onboarding-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isAuthenticated: boolean = false; // Initial value is false
  private isAuthenticatedSubscription?: Subscription = undefined;
  
  constructor(private stateService: OnboardingStateService, private authService: AmplifyAuthService, private router: Router) {

  }
  ngOnInit() {
    if (this.stateService.currentOnboardingState == null) {
      this.stateService.currentOnboardingState = {
        cameraPermissionsGranted: false,
        profileCompleted: false,
        currentOnboardingProfile: {
          country: '',
          email: '',
          nickname: ''
        }
      }  
    }
    this.isAuthenticatedSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          if (!this.stateService.currentOnboardingState.profileCompleted) {
            this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['profile']}}])
          } else {
            this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['camera']}}])
          }
        }
      }
    );
    if (this.authService.isAuthenticated$) {

    }
    
  }
}
