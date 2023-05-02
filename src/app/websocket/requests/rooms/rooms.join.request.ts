import { WebSocketRequest } from "../../websocket.request";

export interface JoinRoomRequest extends WebSocketRequest {
  RoomId: string;
  PlayerId: string;
  PlayerName: string;
}
