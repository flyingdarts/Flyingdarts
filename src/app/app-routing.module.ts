import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ChatComponent } from './chat/chat.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
