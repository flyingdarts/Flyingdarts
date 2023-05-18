import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnboardingStateService {
  private storage = localStorage;

  public clear(): void {
    this.storage.removeItem('OnboardingStateService.CurrentOnboardingState');
  }

  public get currentOnboardingState(): CurrentOnboardingState {
    const key = 'OnboardingStateService.CurrentOnboardingState';
    const serializedRequest = JSON.parse(this.storage.getItem(key)!);
    return serializedRequest;
  }

  public set currentOnboardingState(value: CurrentOnboardingState) {
    const key = 'OnboardingStateService.CurrentOnboardingState';
    this.storage.setItem(key, JSON.stringify(value));
  }
}

export interface CurrentOnboardingState {
    facebookId: string | null;
    profileCompleted: boolean;
    cameraPermissionsGranted: boolean;
    currentOnboardingProfile: CurrentOnboardingProfile;
}

export interface CurrentOnboardingProfile {
  nickname: string;
  email: string;
  country: string;
}