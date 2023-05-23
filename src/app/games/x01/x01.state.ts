export interface X01State {
  player: X01PlayerState;
  opponent: X01PlayerState;
}


export interface X01PlayerState {
  name: string;
  score: number;
  scores: string[];
  total: number;
  sets: number;
  legs: number;
}

