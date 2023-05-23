import { UserProfileDetails } from "../../../shared/models/user-profile-details.model";

// user.state.ts
export interface UserState {
  isAuthenticated: boolean;
  profile: UserProfileDetails;
}
