import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GamesState, X01State, X01PlayerState } from './games-state';

export const getGamesState = createFeatureSelector<GamesState>('games');
export const getX01State = createSelector(getGamesState, (state: GamesState) => state.x01);