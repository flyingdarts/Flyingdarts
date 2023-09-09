import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, pipe, switchMap, tap } from "rxjs";
import { X01PlayerState, X01State, initialX01State } from "./x01.state";

@Injectable()
export class X01Store extends ComponentStore<X01State> {
  constructor() {
    super(initialX01State);
  }

  private readonly currentInput$: Observable<string> = this.select(state => state.currentInput)
  private readonly player$: Observable<X01PlayerState> = this.select(state => state.player);
  private readonly opponent$: Observable<X01PlayerState> = this.select(state => state.opponent);
  private readonly loading$: Observable<boolean> = this.select(state => state.loading);
  private readonly error$: Observable<string> = this.select(state => state.error);
  
  readonly vm$ = this.select(
    this.currentInput$,
    this.player$,
    this.opponent$,
    this.loading$,
    this.error$,
    (player, opponent, loading, error) => ({
      player,
      opponent,
      loading,
      error,
    }),
    { debounce: true }
  )
  
  readonly setCurrentInput = this.updater((state, value: string) => ({ ...state, currentInput: value }));

  readonly setLoading = this.updater((state, value: boolean) => ({ ...state, loading: value }))

  readonly playerScore$ = this.select(state => state.player.score)
  readonly playerName$ = this.select(state=> state.player.name)

  readonly setPlayerScore = this.updater((state, value: number) => ({ ...state, player: { ...state.player, score: value } }))
  readonly setOpponentScore = this.updater((state, value: number) => ({ ...state, opponent: { ...state.opponent, score: value } }))
  
  readonly setPlayerHistory = this.updater((state, value: number[]) => ({ ...state, player: { ...state.player, scores: value }}))
  readonly setOpponentHistory = this.updater((state, value: number[]) => ({ ...state, opponent: { ...state.opponent, scores: value }}))

  readonly setPlayerName = this.updater((state, value: string) => ({ ...state, player: { ...state.player, name: value }}))
  readonly setOpponentName = this.updater((state, value: string) => ({ ...state, opponent: { ...state.opponent, name: value }}))
}