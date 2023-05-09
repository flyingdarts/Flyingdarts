import { WebSocketRequest } from "../../websocket.request";
import { UserProfileDetails } from "./user.profile.details";

export interface CreateUserProfileRequest extends UserProfileDetails, WebSocketRequest  {
    cognitoUserId: string;
    socialLoginProviderId: string;
    email: string;
}
