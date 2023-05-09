import { WebSocketRequest } from "src/app/infrastructure/websocket/websocket.request.model";

export interface JoinRoomRequest extends WebSocketRequest {
  RoomId: string;
  PlayerId: string;
  PlayerName: string;
}
