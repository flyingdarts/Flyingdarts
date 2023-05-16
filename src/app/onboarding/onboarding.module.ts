import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { CameraComponent } from './camera/camera.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { OnboardingRootComponent } from './onboarding-root/onboarding-root.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileApiService } from '../services/user-profile-api.service';
import { OnboardingStateService } from '../services/onboarding-state.service';


@NgModule({
  declarations: [
    ProfileComponent,
    CameraComponent,
    LoginComponent,
    OnboardingRootComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnboardingRoutingModule,
    AmplifyAuthenticatorModule,
    SharedModule
  ],
  providers: [
    OnboardingStateService,
    UserProfileApiService,
  ]
})
export class OnboardingModule { }
