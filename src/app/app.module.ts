import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LobbyComponent } from './lobby/lobby.component';
import { WebsocketService } from './services/websocket.service';
import { X01Component } from './x01/x01.component';
import { LottieModule } from 'ngx-lottie';
import { LoadingComponent } from './loading/loading.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { LoadingService } from './loading/loading.service';
import { PlayerLocalStorageService } from './services/player.local-storage.service';

// Export this function
export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    LobbyComponent,
    X01Component,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }, WebsocketService, LoadingService, PlayerLocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }