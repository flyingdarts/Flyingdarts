import { Injectable } from "@angular/core";
import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";

export interface IAmplifyAuthService {
    getUser(): Promise<CognitoUser | null>;
    signOut(): void;
}
@Injectable()
export class AmplifyAuthService implements IAmplifyAuthService {
    public async getUser(): Promise<CognitoUser | null> {
        const userInfo: CognitoUser = await Auth.currentUserInfo();
        if (userInfo == null) {
            return null;
        }
        console.log(userInfo);
        return userInfo;
    }

    public signOut(): void {
        Auth.signOut({ global: true });
    }

    async checkAuthStatus(): Promise<boolean> {
        try {
          await Auth.currentAuthenticatedUser();
          return true;
        } catch (error) {
          return false;
        }
      }
}

