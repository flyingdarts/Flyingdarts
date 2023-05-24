export interface X01State {
  player: X01PlayerState;
  opponent: X01PlayerState;
  loading: boolean;
  error: string;
}


export interface X01PlayerState {
  name: string;
  score: number;
  scores: number[];
  total: number;
  sets: number;
  legs: number;
}

export const initialX01State: X01State = {
  loading: false,
  error: '',
  player: {
    name: 'player',
    legs: 0,
    sets: 0,
    score: 501,
    scores: [],
    total: 6
  },
  opponent: {
    name: 'opponent',
    legs: 0,
    sets: 0,
    score: 501,
    scores: [],
    total: 6
  }
}