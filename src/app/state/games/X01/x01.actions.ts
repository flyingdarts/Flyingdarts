import { createAction, props } from '@ngrx/store';
import { X01PlayerState } from './games-state';

export const updatePlayerName = createAction('[Games] Update Player Name', props<{ name: string }>());
export const updatePlayerScore = createAction('[Games] Update Player Score', props<{ score: number }>());
export const updatePlayerScores = createAction('[Games] Update Player Scores', props<{ scores: string[] }>());
export const updatePlayerTotal = createAction('[Games] Update Player Total', props<{ total: number }>());
export const updatePlayerSets = createAction('[Games] Update Player Sets', props<{ sets: number }>());
export const updatePlayerLegs = createAction('[Games] Update Player Legs', props<{ legs: number }>());

export const updateOpponentName = createAction('[Games] Update Opponent Name', props<{ name: string }>());
export const updateOpponentScore = createAction('[Games] Update Opponent Score', props<{ score: number }>());
export const updateOpponentScores = createAction('[Games] Update Opponent Scores', props<{ scores: string[] }>());
export const updateOpponentTotal = createAction('[Games] Update Opponent Total', props<{ total: number }>());
export const updateOpponentSets = createAction('[Games] Update Opponent Sets', props<{ sets: number }>());
export const updateOpponentLegs = createAction('[Games] Update Opponent Legs', props<{ legs: number }>());
