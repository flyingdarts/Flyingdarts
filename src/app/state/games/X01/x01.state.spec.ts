import { TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { updatePlayerName, updatePlayerScore } from './x01.actions';
import { x01Reducer } from './x01.reducers';
import { getPlayerName, getPlayerScore } from './x01.selectors';

describe('X01 State', () => {
  let store: Store;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          x01: combineReducers({ x01: x01Reducer }),
        }),
      ],
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should update player name', () => {
    const name = 'John Doe';
    store.dispatch(updatePlayerName({ name }));

    let playerName: string;
    store.select(getPlayerName).subscribe((value) => {
      playerName = value;
    });

    expect(playerName!).toEqual(name);
  });

  it('should update player score', () => {
    const score = 50;
    store.dispatch(updatePlayerScore({ score }));

    let playerScore: number;
    store.select(getPlayerScore).subscribe((value) => {
      playerScore = value;
    });

    expect(playerScore!).toEqual(score);
  });

  // Add more tests for other actions, reducers, and selectors as needed
});
