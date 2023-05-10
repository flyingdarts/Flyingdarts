import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'src/app/infrastructure/cognito/cognito-user.model';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { OnboardingApiService } from 'src/app/services/onboarding-api.service';
import { OnboardingStateService } from 'src/app/services/onboarding-state.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  constructor(
    private router: Router, 
    public authenticator: AuthenticatorService, 
    private amplifyAuthService: AmplifyAuthService,
    private onboardingStateService: OnboardingStateService,
    private onboardingApiService: OnboardingApiService) {
    this.profileForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }
  ngOnInit(): void {
  }
  async submitForm() {
    console.log(this.profileForm.value);
    if (this.profileForm.valid) {
      this.onboardingStateService.currentOnboardingState = { profileCompleted: true, cameraPermissionsGranted: false,
      currentOnboardingProfile: {
        nickname: this.profileForm.value.userName,
        email: this.profileForm.value.email,
        country: this.profileForm.value.country
      }}
        this.onboardingApiService.createUserProfile({
          cognitoUserId: this.amplifyAuthService.getCognitoUserId(),
          userName: this.profileForm.value.userName,
          email: this.profileForm.value.email,
          country: this.profileForm.value.country
        })
      this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['camera']}}])
    }
      
  }  
}
