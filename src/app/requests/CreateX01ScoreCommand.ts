import { WebSocketRequest } from "src/app/infrastructure/websocket/websocket.request.model";


export interface CreateX01ScoreCommand extends WebSocketRequest {
  GameId: string;
  PlayerId: string;
  Score: number;
  Input: number;
}
