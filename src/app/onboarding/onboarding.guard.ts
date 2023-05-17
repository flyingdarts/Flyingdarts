import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { OnboardingStateService } from '../services/onboarding-state.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  constructor(private stateService: OnboardingStateService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("should be blocking", this.stateService.currentOnboardingState.profileCompleted)
    return !this.stateService.currentOnboardingState.profileCompleted;

  }
  
}
