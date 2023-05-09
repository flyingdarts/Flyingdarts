import { WebSocketRequest } from "../../websocket.request.model";

export interface PlayerConnectedRequest extends WebSocketRequest {
    PlayerId: string;
}