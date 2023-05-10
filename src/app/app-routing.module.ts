import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  // Private module routes
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(mod => mod.PublicModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)
  },
  { 
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then(mod => mod.OnboardingModule)
  },
  {
    path: 'lobby',
    loadChildren: () => import('./lobby/lobby.module').then(mod => mod.LobbyModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then(mod => mod.GamesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }