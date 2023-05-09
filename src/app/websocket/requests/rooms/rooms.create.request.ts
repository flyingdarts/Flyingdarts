import { WebSocketRequest } from "src/app/infrastructure/websocket/websocket.request.model";

export interface CreateRoomRequest extends WebSocketRequest {
  RoomId: string;
}
