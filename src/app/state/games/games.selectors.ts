import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { GamesState } from './games.state';
import { X01State } from './X01/x01.state';

export const getGamesState = createFeatureSelector<GamesState>('games');
export const getX01State = createSelector(getGamesState, (state: GamesState) => state.x01) as MemoizedSelector<object, X01State>;