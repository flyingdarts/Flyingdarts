import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization.guard';
import { ChatComponent } from './pages/private/chat/chat.component';
import { TermsOfServiceComponent } from './pages/public/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './pages/public/privacy-policy/privacy-policy.component';
import { AuthComponent } from './pages/public/auth/auth.component';

const routes: Routes = [
  // Private module routes
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'chat',
    canActivate: [AuthorizationGuard],
    component: ChatComponent,
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// 