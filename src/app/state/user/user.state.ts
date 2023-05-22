import { UserProfileDetails } from "src/app/shared/models/user-profile-details.model";

// user.state.ts
export interface UserState {
  isAuthenticated: boolean;
  profile: UserProfileDetails;
}
