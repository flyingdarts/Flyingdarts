import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { CameraComponent } from './camera/camera.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { OnboardingRootComponent } from './onboarding-root/onboarding-root.component';


@NgModule({
  declarations: [
    CarouselComponent,
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
  ]
})
export class OnboardingModule { }
