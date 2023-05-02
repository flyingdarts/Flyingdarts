import { WebSocketRequest } from "../../websocket.request";


export interface CreateX01ScoreRequest extends WebSocketRequest {
  RoomId: string;
  PlayerId: string;
  Score: number;
  Input: number;
}
