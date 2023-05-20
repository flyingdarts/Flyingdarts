// user.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserProfileDetails } from './user-profile-details';

export const setIsAuthenticated = createAction('[User] Set Is Authenticated', props<{ isAuthenticated: boolean }>());
export const setProfile = createAction('[User] Set Profile', props<{ profile: UserProfileDetails }>());
