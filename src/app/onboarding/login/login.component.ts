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
  
  constructor(private stateService: OnboardingStateService) {

  }
  async ngOnInit() {

    this.initOnboardingState();
  }

  initOnboardingState() {
    if (this.stateService.currentOnboardingState == null)
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
}
