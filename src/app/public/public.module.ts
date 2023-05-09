import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LeaderboardComponent,
    PrivacyPolicyComponent, 
    TermsOfServiceComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
