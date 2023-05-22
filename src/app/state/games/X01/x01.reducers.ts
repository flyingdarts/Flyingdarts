import { createReducer, on } from '@ngrx/store';
import { updatePlayerName, updatePlayerScore, updatePlayerScores, updatePlayerTotal, updatePlayerSets, updatePlayerLegs, updateOpponentName, updateOpponentScore, updateOpponentScores, updateOpponentTotal, updateOpponentSets, updateOpponentLegs } from './x01.actions';
import { X01State } from './x01.state';
export const initialState: X01State = {
  player: {
    name: '',
    score: 0,
    total: 0,
    sets: 0,
    legs: 0,
    scores: []
  },
  opponent: {
    name: '',
    score: 0,
    total: 0,
    sets: 0,
    legs: 0,
    scores: []
  }
};

export const x01Reducer = createReducer(
  initialState,
  on(updatePlayerName, (state, { name }) => ({ ...state, player: { ...state.player, name } })),
  on(updatePlayerScore, (state, { score }) => ({ ...state, player: { ...state.player, score } })),
  on(updatePlayerScores, (state, { scores }) => ({ ...state, player: { ...state.player, scores } })),
  on(updatePlayerTotal, (state, { total }) => ({ ...state, player: { ...state.player, total } })),
  on(updatePlayerSets, (state, { sets }) => ({ ...state, player: { ...state.player, sets } })),
  on(updatePlayerLegs, (state, { legs }) => ({ ...state, player: { ...state.player, legs } })),

  on(updateOpponentName, (state, { name }) => ({ ...state, opponent: { ...state.opponent, name } })),
  on(updateOpponentScore, (state, { score }) => ({ ...state, opponent: { ...state.opponent, score } })),
  on(updateOpponentScores, (state, { scores }) => ({ ...state, opponent: { ...state.opponent, scores } })),
  on(updateOpponentTotal, (state, { total }) => ({ ...state, opponent: { ...state.opponent, total } })),
  on(updateOpponentSets, (state, { sets }) => ({ ...state, opponent: { ...state.opponent, sets } })),
  on(updateOpponentLegs, (state, { legs }) => ({ ...state, opponent: { ...state.opponent, legs } }))
);
