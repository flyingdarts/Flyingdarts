import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LobbyComponent } from './lobby.component';
import { UserProfileApiService } from '../services/user-profile-api.service';


@NgModule({
  declarations: [
    LobbyComponent
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    UserProfileApiService,
  ]
})
export class LobbyModule { }
