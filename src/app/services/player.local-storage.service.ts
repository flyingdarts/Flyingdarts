import { Injectable } from "@angular/core";

@Injectable()
export class PlayerLocalStorageService {
    // User name
    setUserName(name: string) {
        localStorage.setItem(LocalStorageKeys.UserName, name);
    }

    getUserName(): string {
        return localStorage.getItem(LocalStorageKeys.UserName)!;
    }
    // User id
    setUserId(guid: string) {
        localStorage.setItem(LocalStorageKeys.UserId, guid);
    }

    getUserId(): string {
        return localStorage.getItem(LocalStorageKeys.UserId)!;
    }
}


export enum LocalStorageKeys {
    UserId = "UserId",
    UserName = "UserName"
}