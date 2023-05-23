import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { X01Component } from './x01/x01.component';
import { SharedModule } from '../shared/shared.module';
import { GamesRootComponent } from './games-root/games-root.component';
import { StoreModule } from '@ngrx/store';
import { gamesReducer } from '../state/games/games.reducer';


@NgModule({
  declarations: [
    X01Component,
    GamesRootComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule,
    StoreModule.forFeature('games', gamesReducer),
  ]
})
export class GamesModule { }
