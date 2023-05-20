import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/websocket.service';
import { AppRoutingModule } from './app-routing.module';
import { AmplifyAuthService } from './services/amplify-auth.service';
import { ApiService } from './services/room-api.service';
import { JitsiService } from './services/jitsi.service';
import { LoadingService } from './services/loading.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { WebcamService } from './services/webcam.service';
import { OnboardingStateService } from './services/onboarding-state.service';
import { UserProfileApiService } from './services/user-profile-api.service';
import { UserProfileStateService } from './services/user-profile-state.service';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { X01ApiService } from './services/x01-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    WebSocketService,
    ApiService,
    LoadingService,
    AmplifyAuthService,
    JitsiService,
    WebcamService,
    OnboardingStateService,
    UserProfileStateService,
    UserProfileApiService,
    X01ApiService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
