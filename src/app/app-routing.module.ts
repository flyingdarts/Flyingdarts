import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { X01Component } from './x01/x01.component';

const routes: Routes = [
  {
    path: '',
    component: LobbyComponent
  },
  {
    path: 'x01/:roomId',
    component: X01Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
