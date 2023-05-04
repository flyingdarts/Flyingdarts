import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { OnboardingStateService } from 'src/app/services/onboarding-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private amplifyAuthService: AmplifyAuthService, private router: Router, private stateService: OnboardingStateService) {

  }

  async ngOnInit() {
    if (await this.amplifyAuthService.checkAuthStatus()) {
      this.stateService.currentOnboardingState = {cameraPermissionsGranted: false, profileCompleted: false}
      this.router.navigate(['/profile'])
    }
  }
}
