import { WebSocketRequest } from "./../../../infrastructure/websocket/websocket.request.model";
import { UserProfileDetails } from "../../../shared/models/user-profile-details.model";

export interface CreateUserProfileRequest extends UserProfileDetails, WebSocketRequest  {
    cognitoUserId: string;
    socialLoginProviderId: string;
    email: string;
}
