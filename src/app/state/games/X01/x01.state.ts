export interface X01State {
  player: X01PlayerState;
  opponent: X01PlayerState;
  sets: number;
  legs: number;
  doubleIn: boolean;
  doubleOut: boolean;
}

export interface X01PlayerState {
  name: string;
  sets: number;
  legs: number;
  score: number;
  scores: string[];
  scores$: BehaviorSubject<string[]>;
  history$: BehaviorSubject<string>;
  total: number;
}