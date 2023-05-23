import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { GamesState } from "./games.state";

@Injectable({providedIn: 'root'})
export class GamesStore extends ComponentStore<GamesState> {
  super({x01: {}}) {
    
  }
}