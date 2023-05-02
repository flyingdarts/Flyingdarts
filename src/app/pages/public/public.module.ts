import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AuthComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent
  ],
  imports: [
    AmplifyAuthenticatorModule,
    CommonModule
  ],
  
})
export class PublicModule { }
