import { WebSocketRequest } from "../../websocket.request";

export interface CreateRoomRequest extends WebSocketRequest {
  RoomId: string;
}
