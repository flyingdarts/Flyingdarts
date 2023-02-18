import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppRoutingModule } from './app-routing.module';
import { WebSocketService } from './services/websocket/websocket.service';
import { LottieModule } from 'ngx-lottie';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlayerLocalStorageService } from './services/player.local-storage.service';
import { AppComponent } from './components/app/app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './components/loading/loading.interceptor';
import { LoadingService } from './components/loading/loading.service';
import { LobbyComponent } from './components/lobby/lobby.component';
import { WebcamModule } from 'ngx-webcam';
import { JitsiService } from './services/jitsi.service';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { AmplifyAuthService } from './services/amplify-auth.service';
import { ApiService } from './services/api.service';
import { StoreModule } from '@ngrx/store';
import { DartboardComponent } from './components/x01/controls/dartboard/dartboard.component';
import { X01Component } from './components/x01/x01.component';
import { environment } from '../environments/environment';

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
    LoadingComponent,
    ThankYouComponent,
    DartboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule,
    WebcamModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    WebSocketService,
    ApiService,
    LoadingService,
    PlayerLocalStorageService,
    AmplifyAuthService,
    JitsiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }