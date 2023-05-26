
export interface UserProfileDetails {
    UserName: string;
    Country: string;
    Email: string;
    Id: string;

    isRegistered?: boolean;
    cameraPermissionGranted?: boolean;
    cognitoUserId?: string;
    cognitoUserName?: string;
}
