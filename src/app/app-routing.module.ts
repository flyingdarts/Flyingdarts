import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { X01Component } from './components/x01/x01.component';

const routes: Routes = [
  {
    path: '',
    component: LobbyComponent
  },
  {
    path: 'x01',
    component: X01Component
  },
  {
    path: 'loading',
    component: LoadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
