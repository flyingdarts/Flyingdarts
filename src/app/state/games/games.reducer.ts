import { createReducer, on } from "@ngrx/store";
import { GamesState } from "./games.state";
import { updatePlayerName, updatePlayerScore, updatePlayerScores, updatePlayerTotal, updatePlayerSets, updatePlayerLegs, updateOpponentName, updateOpponentScore, updateOpponentScores, updateOpponentTotal, updateOpponentSets, updateOpponentLegs } from "./X01/x01.actions";

export const initialState: GamesState = {
  x01: {
    player: {
      name: '',
      score: 0,
      total: 0,
      sets: 0,
      legs: 0,
      scores: ["0", "0", "0"]
    },
    opponent: {
      name: '',
      score: 0,
      total: 0,
      sets: 0,
      legs: 0,
      scores: ["0", "0", "0"]
    }
  }
};

export const gamesReducer = createReducer(
    initialState
);