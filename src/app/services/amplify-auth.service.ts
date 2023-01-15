import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";

export interface IAmplifyAuthService {
    getUser(): Promise<string>;
    signOut(): void;
}
@Injectable()
export class AmplifyAuthService implements IAmplifyAuthService {
    public getUser(): Promise<string> {
        return Auth.currentUserInfo();
    }
    public signOut(): void {
        Auth.signOut({ global: true });
    }
}