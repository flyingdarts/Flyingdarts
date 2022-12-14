import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LobbyComponent } from './lobby/lobby.component';
import { WebsocketService } from './services/websocket.service';
import { X01Component } from './x01/x01.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    LobbyComponent,
    X01Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }