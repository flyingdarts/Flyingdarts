import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { AuthorizationGuard } from '../guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: LobbyComponent,
    canActivate: [AuthorizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
