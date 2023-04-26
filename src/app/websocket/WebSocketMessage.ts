export enum WebSocketStatus {
  Unknown = "WebSocket status unknown",
  Disconnected = "Lost connection to server.",
  Connected = "Connected."
}

export enum WebSocketActions {
  Connect = "connect$",
  Disconnect = "disconnect$",
  Default = "default$"
}

export interface WebSocketRequest {

}
export interface MessageRequest extends WebSocketRequest {
    date: Date;
    message: string;
    owner: string;
}

export interface WebSocketMessage<T = WebSocketRequest> {
  action: WebSocketActions;
  message?: T;
}
