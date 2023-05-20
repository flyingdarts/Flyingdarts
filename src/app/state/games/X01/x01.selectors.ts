import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GamesState, X01PlayerState, X01State } from './games-state';

export const getGamesState = createFeatureSelector<GamesState>('games');

// Player selectors
export const getPlayerState = createSelector(getGamesState, (state: GamesState) => state.x01.player);
export const getPlayerName = createSelector(getPlayerState, (state: X01PlayerState) => state.name);
export const getPlayerSets = createSelector(getPlayerState, (state: X01PlayerState) => state.sets);
export const getPlayerLegs = createSelector(getPlayerState, (state: X01PlayerState) => state.legs);
export const getPlayerScore = createSelector(getPlayerState, (state: X01PlayerState) => state.score);
export const getPlayerScores = createSelector(getPlayerState, (state: X01PlayerState) => state.scores);
export const getPlayerTotal = createSelector(getPlayerState, (state: X01PlayerState) => state.total);
export const getPlayerScores$ = createSelector(getPlayerState, (state: X01PlayerState) => state.scores$);
export const getPlayerHistory$ = createSelector(getPlayerState, (state: X01PlayerState) => state.history$);

// Opponent selectors
export const getOpponentState = createSelector(getGamesState, (state: GamesState) => state.x01.opponent);
export const getOpponentName = createSelector(getOpponentState, (state: X01PlayerState) => state.name);
export const getOpponentSets = createSelector(getOpponentState, (state: X01PlayerState) => state.sets);
export const getOpponentLegs = createSelector(getOpponentState, (state: X01PlayerState) => state.legs);
export const getOpponentScore = createSelector(getOpponentState, (state: X01PlayerState) => state.score);
export const getOpponentScores = createSelector(getOpponentState, (state: X01PlayerState) => state.scores);

// X01 state selectors
export const getX01State = createSelector(getGamesState, (state: GamesState) => state.x01);
export const getSets = createSelector(getX01State, (state: X01State) => state.sets);
export const getLegs = createSelector(getX01State, (state: X01State) => state.legs);
export const getDoubleIn = createSelector(getX01State, (state: X01State) => state.doubleIn);
export const getDoubleOut = createSelector(getX01State, (state: X01State) => state.doubleOut);
