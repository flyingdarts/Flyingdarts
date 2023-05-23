import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { X01Component } from './x01.component';
import { gamesReducer } from 'src/app/state/games/games.reducer';
import { StoreModule } from '@ngrx/store';
import { GameStore } from 'src/app/state/games/game.store';
import { initialX01State } from 'src/app/state/games/X01/x01.reducers';

describe('X01Component', () => {
  let component: X01Component;
  let fixture: ComponentFixture<X01Component>;
  let gameStore: GameStore;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({games: gamesReducer})
      ],
      declarations: [X01Component],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'test123' })
            }
          }
        },
        {
            provide: GameStore
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(X01Component);
    component = fixture.componentInstance;
    gameStore = TestBed.inject(GameStore)
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have a non-empty gameId', waitForAsync(async () => {
    fixture.detectChanges();
    await component.ngOnInit();
    expect(component.gameId).toEqual('test123');
  }));  
});
