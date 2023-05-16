import { Injectable, OnInit } from "@angular/core";
import { Auth } from "aws-amplify";
import { CognitoUser } from "../infrastructure/cognito/cognito-user.model";
import { UserProfileApiService } from "./user-profile-api.service";
import { WebSocketService } from "./websocket.service";
import { WebSocketActions } from "../infrastructure/websocket/websocket.actions.enum";
import { UserProfileDetails } from "../shared/models/user-profile-details.model";
import { OnboardingStateService } from "./onboarding-state.service";
import { Observable, from, map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AmplifyAuthService {
    public get isAuthenticated$(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(user => Boolean(user))
    );
  }
  public async getCognitoUserId(): Promise<string> {
   var userInfo = await Auth.currentUserInfo() as CognitoUser;
    return userInfo.username
  }
  
  public signOut(): void {
    Auth.signOut({ global: true });
  }
}

