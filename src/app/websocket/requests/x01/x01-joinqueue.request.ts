import { WebSocketRequest } from "src/app/infrastructure/websocket/websocket.request.model";

export interface JoinX01QueueRequest extends WebSocketRequest {
  GamePlayerId: string;
  RoomId?: string;
}
