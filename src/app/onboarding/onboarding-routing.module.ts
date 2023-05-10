import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { OnboardingGuard } from './onboarding.guard';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent } from './login/login.component';
import { OnboardingRootComponent } from './onboarding-root/onboarding-root.component';

const routes: Routes = [
  {
    path: "",
    component: OnboardingRootComponent,
    canActivate: [OnboardingGuard],
    children: [
      {
        path: "login",
        component: LoginComponent,
        outlet: "onboarding-outlet"
      },
      {
        path: "profile",
        component: ProfileComponent,
        outlet: "onboarding-outlet"
      },
      {
        path: "camera",
        component: CameraComponent,
        outlet: "onboarding-outlet"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
