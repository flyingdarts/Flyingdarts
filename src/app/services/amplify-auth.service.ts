import { Injectable, OnInit } from "@angular/core";
import { Auth } from "aws-amplify";
import { CognitoUser } from "../infrastructure/cognito/cognito-user.model";
import { OnboardingApiService } from "./onboarding-api.service";
import { WebSocketService } from "./websocket.service";
import { WebSocketActions } from "../infrastructure/websocket/websocket.actions.enum";
import { UserProfileDetails } from "../shared/models/user-profile-details.model";
import { OnboardingStateService } from "./onboarding-state.service";
import { Observable, from, map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AmplifyAuthService implements OnInit {
  private _isRegistered: boolean = false;
  
  constructor(
    private onboardingApiService: OnboardingApiService,
    private webSocketService: WebSocketService) {
  }
  async ngOnInit() {
    // Send request to fetch the authenticated user's profile.
    this.onboardingApiService.getUserProfile((await Auth.currentUserInfo() as CognitoUser).username);

    this.webSocketService.getMessages().subscribe(x => {
      // Response from v2/user/profile/get
      if (x.action === WebSocketActions.UserProfileGet) {
        // user is registered if we have a profile stored for them.
        this._isRegistered = !!(x.message as UserProfileDetails)
      }
    })
  }

  public get isAuthenticated$(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(user => Boolean(user))
    );
  }

  public get isRegistered$(): Observable<boolean> {
    return of(this._isRegistered);
  }

  public async getCognitoUserId(): Promise<string> {
    return (await Auth.currentUserInfo() as CognitoUser).username
  }
  
  public signOut(): void {
    Auth.signOut({ global: true });
  }
}

