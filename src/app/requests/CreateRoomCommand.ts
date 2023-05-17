import { WebSocketRequest } from "src/app/infrastructure/websocket/websocket.request.model";


export interface CreateRoomCommand extends WebSocketRequest {
  RoomId: string;
}
