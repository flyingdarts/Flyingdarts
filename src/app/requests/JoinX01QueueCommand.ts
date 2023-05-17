import { WebSocketRequest } from "src/app/infrastructure/websocket/websocket.request.model";


export interface JoinX01QueueCommand extends WebSocketRequest {
  PlayerId: string;
  GameId?: string;
}
