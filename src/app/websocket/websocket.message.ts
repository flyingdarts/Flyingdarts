import { WebSocketActions } from './websocket.actions';
import { WebSocketRequest } from './websocket.request';


export interface WebSocketMessage<T = WebSocketRequest> {
  action: WebSocketActions;
  message?: T;
}