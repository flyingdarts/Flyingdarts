import { createAction, createReducer, createSelector, on, props } from "@ngrx/store";

export const setPlayerName = createAction('[Scoreboard Page] setPlayerName', props<{ currentState: X01State }>());
export const setOpponentName = createAction('[Scoreboard Page] setOpponentName', props<{ currentState: X01State }>());
export const setPlayerScore = createAction('[Scoreboard Page] setPlayerScore', props<{ currentState: X01State }>());
export const setOpponentScore = createAction('[Scoreboard Page] setOpponentScore', props<{ currentState: X01State }>());

export interface AppState {
    X01: X01State
}

export const selectX01 = (state: AppState) => state.X01;

export const selectX01Home = createSelector(selectX01, (state: X01State) => state.home);
export const selectX01Away = createSelector(selectX01, (state: X01State) => state.away);

export interface X01State {
    home?: number | undefined;
    away?: number | undefined;
    playerName?: string | undefined;
    opponentName?: string | undefined;
}

export const initialState: X01State = {
    home: 501,
    away: 501,
    playerName: "Player",
    opponentName: "Opponent"
};

export const x01Reducer = createReducer(
    initialState,
    on(setPlayerScore, (state, { currentState }) => ({ home: currentState.home! })),
    on(setOpponentScore, (state, { currentState }) => ({ away: currentState.away! })),
    on(setPlayerName, (state, { currentState }) => ({ playerName: currentState.playerName! })),
    on(setOpponentName, (state, { currentState }) => ({ opponentName: currentState.opponentName! }))
);
