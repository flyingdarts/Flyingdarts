import { createAction, props } from '@ngrx/store';
import { X01PlayerState, X01State } from './games-state';

// Player actions
export const updatePlayerName = createAction('[Games] Update Player Name', props<{ name: string }>());
export const updatePlayerSets = createAction('[Games] Update Player Sets', props<{ sets: number }>());
export const updatePlayerLegs = createAction('[Games] Update Player Legs', props<{ legs: number }>());
export const updatePlayerScore = createAction('[Games] Update Player Score', props<{ score: number }>());
export const updatePlayerScores = createAction('[Games] Update Player Scores', props<{ scores: string[] }>());
export const updatePlayerTotal = createAction('[Games] Update Player Total', props<{ total: number }>());
export const updatePlayerScores$ = createAction('[Games] Update Player Scores$', props<{ scores$: BehaviorSubject<string[]> }>());
export const updatePlayerHistory$ = createAction('[Games] Update Player History$', props<{ history$: BehaviorSubject<string> }>());

// Opponent actions
export const updateOpponentName = createAction('[Games] Update Opponent Name', props<{ name: string }>());
export const updateOpponentSets = createAction('[Games] Update Opponent Sets', props<{ sets: number }>());
export const updateOpponentLegs = createAction('[Games] Update Opponent Legs', props<{ legs: number }>());
export const updateOpponentScore = createAction('[Games] Update Opponent Score', props<{ score: number }>());
export const updateOpponentScores = createAction('[Games] Update Opponent Scores', props<{ scores: string[] }>());

// X01 state actions
export const updateSets = createAction('[Games] Update Sets', props<{ sets: number }>());
export const updateLegs = createAction('[Games] Update Legs', props<{ legs: number }>());
export const updateDoubleIn = createAction('[Games] Update Double In', props<{ doubleIn: boolean }>());
export const updateDoubleOut = createAction('[Games] Update Double Out', props<{ doubleOut: boolean }>());
export const updateX01State = createAction('[Games] Update X01 State', props<{ x01State: X01State }>());
