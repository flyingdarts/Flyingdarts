import { WebSocketRequest } from "./../infrastructure/websocket/websocket.request.model";
import { Game } from "../games/x01/x01.component";


export interface JoinGameCommand extends WebSocketRequest {
  Game?: Game;
  GameId: string;
  PlayerId: string;
  PlayerName: string;
}
