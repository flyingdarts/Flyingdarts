import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { AmplifyAuthService } from 'src/app/services/amplify-auth.service';
import { OnboardingApiService } from 'src/app/services/onboarding-api.service';
import { OnboardingStateService } from 'src/app/services/onboarding-state.service';

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
    private stateService: OnboardingStateService,
    private apiService: OnboardingApiService) {
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
      console.log("Form is valid: ", this.profileForm.valid);
      this.stateService.currentOnboardingState = { profileCompleted: true, cameraPermissionsGranted: false,
      currentOnboardingProfile: {
        nickname: this.profileForm.value.userName,
        email: this.profileForm.value.email,
        country: this.profileForm.value.country
      }}
      await this.amplifyAuthService.getUser().then(user=> {
        this.apiService.createUserProfile({
          cognitoUserId: user!.username,
          socialLoginProviderId: user!.username, 
          userName: this.profileForm.value.userName,
          email: this.profileForm.value.email,
          country: this.profileForm.value.country
        })
      })
      
      this.router.navigate(['/camera'])
    }
      
  }  
}
