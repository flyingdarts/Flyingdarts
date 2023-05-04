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
import { CarouselComponent } from './pages/public/onboarding/carousel/carousel.component';
import { LeaderboardComponent } from './pages/public/leaderboard/leaderboard.component';
import { WebcamService } from './services/webcam.service';
import { LoginComponent } from './pages/public/onboarding/login/login.component';
import { ProfileComponent } from './pages/public/onboarding/profile/profile.component';
import { CameraComponent } from './pages/public/onboarding/camera/camera.component';
export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    CarouselComponent,
    LeaderboardComponent,
    LoginComponent,
    ProfileComponent,
    CameraComponent
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
    WebcamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
