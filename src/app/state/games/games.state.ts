import { Injectable } from "@angular/core";
import { X01State } from "./X01/x01.state";
import { ComponentStore } from "@ngrx/component-store";

export interface GamesState {
  x01?: X01State;
}
