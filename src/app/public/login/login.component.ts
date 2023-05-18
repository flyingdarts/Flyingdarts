import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingStateService } from 'src/app/services/onboarding-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private stateService: OnboardingStateService, private router: Router) {

  }
  ngOnInit() {
    if (this.stateService.currentOnboardingState == null) {
      this.stateService.currentOnboardingState = {
        facebookId: null,
        cameraPermissionsGranted: false,
        profileCompleted: false,
        currentOnboardingProfile: {
          country: '',
          email: '',
          nickname: ''
        }
      }
    }
     else if (!this.stateService.currentOnboardingState.profileCompleted && this.stateService.currentOnboardingState.facebookId == null) {
      console.log("routing to profile");
      this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['profile'] } }])
    } else if (this.stateService.currentOnboardingState.profileCompleted && !this.stateService.currentOnboardingState.cameraPermissionsGranted && this.stateService.currentOnboardingState.facebookId != null) {
      console.log("routing to camera");
      this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['camera'] } }])
    }
  }
}
