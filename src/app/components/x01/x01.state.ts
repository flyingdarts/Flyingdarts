import { createAction, createReducer, createSelector, on, props } from "@ngrx/store";

export const homeScore = createAction('[Scoreboard Page] Home Score');
export const awayScore = createAction('[Scoreboard Page] Away Score');
export const resetScore = createAction('[Scoreboard Page] Score Reset');
export const setScores = createAction('[Scoreboard Page] Set Scores', props<{ game: X01State }>());

export interface AppState {
    X01: X01State
}

export const selectX01 = (state: AppState) => state.X01;

export const selectX01Home = createSelector(selectX01, (state: X01State) => state.home);
export const selectX01Away = createSelector(selectX01, (state: X01State) => state.away);

export interface X01State {
    home: number;
    away: number;
}

export const initialState: X01State = {
    home: 301,
    away: 301,
};

export const x01Reducer = createReducer(
    initialState,
    on(homeScore, state => ({ ...state, home: state.home + 1 })),
    on(awayScore, state => ({ ...state, away: state.away + 1 })),
    on(setScores, (state, { game }) => ({ home: game.home, away: game.away }))
);
