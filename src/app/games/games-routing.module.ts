import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { X01Component } from './x01/x01.component';
import { GamesRootComponent } from './games-root/games-root.component';

const routes: Routes = [
  {
    path: "",
    component: GamesRootComponent,
    //canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'x01',
        loadChildren: () => import('./x01/x01.module').then(mod => mod.X01Module),
        outlet: "games-outlet"
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
