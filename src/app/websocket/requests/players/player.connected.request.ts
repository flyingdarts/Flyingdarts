import { WebSocketRequest } from "../../websocket.request";

export interface PlayerConnectedRequest extends WebSocketRequest {
    PlayerId: string;
}