import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";

export interface IAmplifyAuthService {
    getUser(): Promise<string | null>;
    signOut(): void;
}
@Injectable()
export class AmplifyAuthService implements IAmplifyAuthService {
    public async getUser(): Promise<string | null> {
        const userInfo = await Auth.currentUserInfo();
        if (userInfo == null) {
            return null;
        }
        const parsedUserInfo = JSON.parse(JSON.stringify(userInfo));
        return parsedUserInfo.attributes.name;
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