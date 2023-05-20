// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setIsAuthenticated, setProfile } from './user.actions';
import { UserState } from './user.state';

export const initialState: UserState = {
  isAuthenticated: false,
  profile: null
};

export const userReducer = createReducer(
  initialState,
  on(setIsAuthenticated, (state, { isAuthenticated }) => ({ ...state, isAuthenticated })),
  on(setProfile, (state, { profile }) => ({ ...state, profile }))
);
