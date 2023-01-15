import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { scoreInput, scoreReset } from "./x01.actions";

export const initialState = "501";

export const x01Reducer = createReducer(
    initialState,
    on(scoreInput, (state) => state + 1),
    on(scoreReset, (state) => "501")
);

export interface IAppState {
    readonly input: string;
}

export const reducers: ActionReducerMap<IAppState> = {
    input: x01Reducer
}