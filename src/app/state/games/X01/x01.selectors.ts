import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getX01State } from '../games.selectors';
import { X01State, X01PlayerState } from './x01.state';

export const getPlayer = createSelector(getX01State, (state: X01State) => state.player);
export const getPlayerName = createSelector(getPlayer, (player: X01PlayerState) => player.name);
export const getPlayerScore = createSelector(getPlayer, (player: X01PlayerState) => player.score);
export const getPlayerScores = createSelector(getPlayer, (player: X01PlayerState) => player.scores);
export const getPlayerTotal = createSelector(getPlayer, (player: X01PlayerState) => player.total);
export const getPlayerSets = createSelector(getPlayer, (player: X01PlayerState) => player.sets);
export const getPlayerLegs = createSelector(getPlayer, (player: X01PlayerState) => player.legs);

export const getOpponent = createSelector(getX01State, (state: X01State) => state.opponent);
export const getOpponentName = createSelector(getOpponent, (opponent: X01PlayerState) => opponent.name);
export const getOpponentScore = createSelector(getOpponent, (opponent: X01PlayerState) => opponent.score);
export const getOpponentScores = createSelector(getOpponent, (opponent: X01PlayerState) => opponent.scores);
export const getOpponentTotal = createSelector(getOpponent, (opponent: X01PlayerState) => opponent.total);
export const getOpponentSets = createSelector(getOpponent, (opponent: X01PlayerState) => opponent.sets);
export const getOpponentLegs = createSelector(getOpponent, (opponent: X01PlayerState) => opponent.legs);
