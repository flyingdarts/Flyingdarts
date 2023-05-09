import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/websocket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AmplifyAuthService } from './services/amplify-auth.service';
import { LottieModule } from 'ngx-lottie';
import { WebcamModule } from 'ngx-webcam';
import { ApiService } from './services/api.service';
import { JitsiService } from './services/jitsi.service';
import { PlayerLocalStorageService } from './services/player.local-storage.service';
import { LoadingService } from './services/loading/loading.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ChatComponent } from './pages/private/chat/chat.component';
import { PrivacyPolicyComponent } from './pages/public/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './pages/public/terms-of-service/terms-of-service.component';
import { LeaderboardComponent } from './pages/public/leaderboard/leaderboard.component';
import { WebcamService } from './services/webcam.service';
import { OnboardingStateService } from './services/onboarding-state.service';
import { FacebookService } from './services/facebook.service';
import { DartboardComponent } from './pages/private/games/x01/dartboard/dartboard.component';
import { X01Component } from './pages/private/games/x01/x01.component';
import { LobbyComponent } from './pages/private/lobby/lobby.component';
import { LoadingComponent } from './components/loading/loading.component';
import { OnboardingApiService } from './services/onboarding-api.service';
import { UserProfileService } from './services/user-profile.service';
export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    LeaderboardComponent,
    X01Component,
    DartboardComponent,
    LobbyComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule,
    WebcamModule,
    ReactiveFormsModule
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
    JitsiService,
    WebcamService,
    OnboardingStateService,
    OnboardingApiService,
    FacebookService,
    UserProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
