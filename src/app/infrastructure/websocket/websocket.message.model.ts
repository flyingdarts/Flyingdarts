import { WebSocketActions } from './websocket.actions.enum';
import { WebSocketRequest } from './websocket.request.model';


export interface WebSocketMessage<T = WebSocketRequest> {
  action: WebSocketActions;
  message?: T;
}