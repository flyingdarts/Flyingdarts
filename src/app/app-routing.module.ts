import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization.guard';
import { ChatComponent } from './pages/private/chat/chat.component';
import { TermsOfServiceComponent } from './pages/public/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './pages/public/privacy-policy/privacy-policy.component';
import { LeaderboardComponent } from './pages/public/leaderboard/leaderboard.component';
import { LoginComponent } from './pages/public/onboarding/login/login.component';
import { ProfileComponent } from './pages/public/onboarding/profile/profile.component';
import { CameraComponent } from './pages/public/onboarding/camera/camera.component';
import { X01Component } from './pages/private/games/x01/x01.component';
import { LobbyComponent } from './pages/private/lobby/lobby.component';

const routes: Routes = [
  // Private module routes
  {
    path: '',
    component: LeaderboardComponent
  },
  {
    path: 'chat',
    canActivate: [AuthorizationGuard],
    component: ChatComponent
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  { 
    path: 'onboarding',
    loadChildren: () => import('./pages/public/onboarding/onboarding.module').then(mod => mod.OnboardingModule)
  },
  {
    path: 'x01:id',
    component: X01Component,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'lobby',
    component: LobbyComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }