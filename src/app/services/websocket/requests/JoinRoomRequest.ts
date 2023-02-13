import { WebSocketRequest } from "../WebSocketRequest";

export interface JoinRoomRequest extends WebSocketRequest {
  RoomId: string;
  PlayerId: string;
  PlayerName: string;
}
