// user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

const getUserState = createFeatureSelector<UserState>('user');

export const isAuthenticated = createSelector(getUserState, (state: UserState) => state.isAuthenticated);

export const getUserProfile = createSelector(getUserState, (state: UserState) => state.profile);
