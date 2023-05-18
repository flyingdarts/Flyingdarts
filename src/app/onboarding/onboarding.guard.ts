import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { OnboardingStateService } from '../services/onboarding-state.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  constructor(private stateService: OnboardingStateService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.stateService.currentOnboardingState.profileCompleted) {
        return true;
      } else {
        if (!this.stateService.currentOnboardingState.cameraPermissionsGranted) {
          this.router.navigate(['/', 'onboarding', { outlets: { 'onboarding-outlet': ['camera']}}]);
          return true;
        } else {
          this.router.navigate(['/', 'lobby']);
          return false;
        }
      }
    }
  
}
