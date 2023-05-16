import { WebSocketRequest } from "src/app/infrastructure/websocket/websocket.request.model";

export interface CreateX01ScoreRequest extends WebSocketRequest {
  RoomId: string;
  PlayerId: string;
  Score: number;
  Input: number;
}
