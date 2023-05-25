import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AmplifyAuthService } from '../services/amplify-auth.service';
import { UserProfileStateService } from '../services/user-profile-state.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AmplifyAuthService, 
    private stateService: UserProfileStateService,
    private router: Router) {

  }
  async canActivate(): Promise<boolean> {
      try {
        if (this.stateService.currentUserProfileDetails != null) {
          this.stateService.currentUserProfileDetails.cognitoUserId = await this.authService.getCognitoId();
          if (!this.stateService.currentUserProfileDetails.isRegistered!) {
            this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['profile'] } }])
            return false;
          }
          else {
            this.router.navigate(['/lobby'])
            return false
          }
        }
        return false;
      } catch(err) {
        console.log(err);
        if (this.stateService.currentUserProfileDetails == null) {
          this.stateService.currentUserProfileDetails = {
            isRegistered: false,
            cameraPermissionGranted: false,
            cognitoUserId: '',
            Id: '',
            UserName: '',
            Country: '',
            Email: '',
          }
          return true;
        } else {
          if (this.stateService.currentUserProfileDetails.cognitoUserId! == "") {
              
              return true;
          } else if (!this.stateService.currentUserProfileDetails.isRegistered!) {
            this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['profile'] } }])
            return false;
          } else if (this.stateService.currentUserProfileDetails.isRegistered! && !this.stateService.currentUserProfileDetails.cameraPermissionGranted!) {
            this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['camera'] } }])
            return false;
          }
        }
        this.router.navigate(['/'])
        return false;
      }
  }
  
}
