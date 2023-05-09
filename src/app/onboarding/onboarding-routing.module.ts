import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { OnboardingGuard } from './onboarding.guard';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent } from './login/login.component';
import { OnboardingRootComponent } from './onboarding-root/onboarding-root.component';

const routes: Routes = [
  {
    path: "welcome",
    canActivate: [OnboardingGuard],
    children: [
      {
        path: "",
        redirectTo: "new-users",
        pathMatch: 'full'
      },
      {
        path: "new-users",
        component: OnboardingRootComponent,
        children: [
          {
            path: "",
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
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
