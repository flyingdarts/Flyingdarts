import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebSocketService } from './websocket/websocket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { AmplifyAuthService } from './services/amplify-auth.service';
import { LottieModule } from 'ngx-lottie';
export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    AuthComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    AmplifyAuthenticatorModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    WebSocketService,
    AmplifyAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
