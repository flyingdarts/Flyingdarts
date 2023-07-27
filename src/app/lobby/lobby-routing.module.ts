import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { ProfileResolver } from '../resolvers/profile.resolver';

const routes: Routes = [
  {
    path: '',
    component: LobbyComponent,
    canActivate: [AuthorizationGuard],
    resolve: { profile: ProfileResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
