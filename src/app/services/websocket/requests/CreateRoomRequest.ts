import { WebSocketRequest } from "../WebSocketRequest";

export interface CreateRoomRequest extends WebSocketRequest {
  RoomId: string;
}
