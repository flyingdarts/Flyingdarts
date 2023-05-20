import { createReducer, on } from '@ngrx/store';
import * as GamesActions from './games.actions';
import { X01State, initialState } from './games-state';

export const x01Reducer = createReducer(
  initialState,
  on(GamesActions.updatePlayerName, (state, { name }) => ({ ...state, player: { ...state.player, name } })),
  on(GamesActions.updatePlayerScore, (state, { score }) => ({ ...state, player: { ...state.player, score } })),
  on(GamesActions.updatePlayerScores, (state, { scores }) => ({ ...state, player: { ...state.player, scores } })),
  on(GamesActions.updatePlayerTotal, (state, { total }) => ({ ...state, player: { ...state.player, total } })),
  on(GamesActions.updatePlayerSets, (state, { sets }) => ({ ...state, player: { ...state.player, sets } })),
  on(GamesActions.updatePlayerLegs, (state, { legs }) => ({ ...state, player: { ...state.player, legs } })),

  on(GamesActions.updateOpponentName, (state, { name }) => ({ ...state, opponent: { ...state.opponent, name } })),
  on(GamesActions.updateOpponentScore, (state, { score }) => ({ ...state, opponent: { ...state.opponent, score } })),
  on(GamesActions.updateOpponentScores, (state, { scores }) => ({ ...state, opponent: { ...state.opponent, scores } })),
  on(GamesActions.updateOpponentTotal, (state, { total }) => ({ ...state, opponent: { ...state.opponent, total } })),
  on(GamesActions.updateOpponentSets, (state, { sets }) => ({ ...state, opponent: { ...state.opponent, sets } })),
  on(GamesActions.updateOpponentLegs, (state, { legs }) => ({ ...state, opponent: { ...state.opponent, legs } }))
);
