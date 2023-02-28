import { WebSocketActions } from './WebSocketActions';
import { WebSocketRequest } from './WebSocketRequest';


export interface WebSocketMessage<T = WebSocketRequest> {
  action: WebSocketActions;
  message?: T;
  metadata?: any;
}
