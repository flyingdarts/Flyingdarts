import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { OnboardingStateService } from 'src/app/services/onboarding-state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  constructor(public authenticator: AuthenticatorService, private router: Router, private stateService: OnboardingStateService) {
    this.profileForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }
  ngOnInit(): void {
  }
  submitForm() {
    console.log(this.profileForm.value);
    if (this.profileForm.valid) {
      this.stateService.currentOnboardingState.profileCompleted = true;
      this.stateService.currentOnboardingState.currentOnboardingProfile = {
        nickname: this.profileForm.value.userName,
        email: this.profileForm.value.email,
        country: this.profileForm.value.country
      }
      this.router.navigate(['/camera'])
    }
      
  }  
}
